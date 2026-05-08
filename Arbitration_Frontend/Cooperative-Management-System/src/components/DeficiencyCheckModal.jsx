import React, { useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import api from "../services/api";

const DeficiencyCheckModal = ({
  show,
  onClose,
  borrower,
  submissionId,
  onSuccess,
}) => {
  const [deficiencyStatus, setDeficiencyStatus] = useState(""); // "NONE" or "FOUND"
  const [deficiencyDetails, setDeficiencyDetails] = useState(""); // Details when FOUND
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validation
    if (!deficiencyStatus) {
      alert("කරුණාකර අඩුපාඩු තත්වය තෝරන්න");
      return;
    }

    if (deficiencyStatus === "FOUND" && !deficiencyDetails.trim()) {
      alert("කරුණාකර අඩුපාඩු විස්තර ඇතුළත් කරන්න");
      return;
    }

    // Debug logging
    console.log("🔍 Deficiency Check Submission:", {
      submissionId,
      borrowerId: borrower?.id,
      deficiencyStatus,
      deficiencyDetails,
      finalValue: deficiencyStatus === "NONE" ? "NONE" : deficiencyDetails,
    });

    // Validate IDs
    if (!submissionId) {
      alert(
        "ඉදිරිපත් කිරීම හඳුනාගත නොහැක. කරුණාකර පිටුව නැවුම් කර නැවත උත්සාහ කරන්න."
      );
      console.error("❌ Missing submissionId");
      return;
    }

    if (!borrower?.id) {
      alert(
        "ණයගැතියා හඳුනාගත නොහැක. කරුණාකර පිටුව නැවුම් කර නැවත උත්සාහ කරන්න."
      );
      console.error("❌ Missing borrower.id");
      return;
    }

    setLoading(true);
    try {
      // Send either "NONE" or the detailed deficiencies
      const deficienciesToSend =
        deficiencyStatus === "NONE" ? "NONE" : deficiencyDetails;

      await api.checkDocumentDeficiencies(
        submissionId,
        borrower.id,
        deficienciesToSend
      );

      alert(
        deficiencyStatus === "NONE"
          ? "ලිපිගොනු පරීක්ෂාව සම්පූර්ණයි - අඩුපාඩු නැත"
          : "ලිපිගොනු අඩුපාඩු සටහන් කරන ලදී"
      );

      // Reset form
      setDeficiencyStatus("");
      setDeficiencyDetails("");
      onClose();
      onSuccess();
    } catch (err) {
      console.error("❌ Deficiency check error:", err);
      alert("දෝෂය: " + (err.message || "නොදන්නා දෝෂයක්"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDeficiencyStatus("");
    setDeficiencyDetails("");
    onClose();
  };

  if (!show) return null;

  return (
    <>
      <div
        className="modal-backdrop show"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        onClick={handleClose}
      ></div>
      <div
        className="modal show d-block"
        style={{ zIndex: 1055 }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ borderRadius: "12px" }}>
            <div
              className="modal-header text-white"
              style={{
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                borderRadius: "12px 12px 0 0",
              }}
            >
              <h5 className="modal-title fw-bold">
                <AlertCircle size={20} className="me-2" />
                ලිපිගොනු අඩුපාඩු පරීක්ෂා කිරීම
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body p-4">
              {/* Borrower Info */}
              <div className="mb-3">
                <strong>{borrower?.borrowerName}</strong>
                <small className="text-muted d-block">
                  ණය අංකය: {borrower?.loanNumber}
                </small>
              </div>

              {/* Deficiency Status Selection */}
              <div className="mb-3">
                <label className="form-label fw-semibold">අඩුපාඩු තිබේද?</label>
                <div className="btn-group w-100" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="deficiency"
                    id="deficiency-none"
                    value="NONE"
                    checked={deficiencyStatus === "NONE"}
                    onChange={(e) => {
                      setDeficiencyStatus(e.target.value);
                      setDeficiencyDetails(""); // Clear details when selecting NONE
                    }}
                  />
                  <label
                    className="btn btn-outline-success"
                    htmlFor="deficiency-none"
                  >
                    <CheckCircle size={16} className="me-2" />
                    නැත
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="deficiency"
                    id="deficiency-found"
                    value="FOUND"
                    checked={deficiencyStatus === "FOUND"}
                    onChange={(e) => setDeficiencyStatus(e.target.value)}
                  />
                  <label
                    className="btn btn-outline-danger"
                    htmlFor="deficiency-found"
                  >
                    <AlertCircle size={16} className="me-2" />
                    තිබේ
                  </label>
                </div>
              </div>

              {/* Deficiency Details Textarea (only shown when FOUND) */}
              {deficiencyStatus === "FOUND" && (
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    අඩුපාඩු විස්තර කරන්න: *
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="උදා: ණය ගිවිසුම නොමැත, ඇපකරුවන්ගේ අත්සන් නැත, ආදිය..."
                    value={deficiencyDetails}
                    onChange={(e) => setDeficiencyDetails(e.target.value)}
                    style={{ borderRadius: "8px" }}
                  ></textarea>
                  <small className="text-muted">
                    කරුණාකර අඩුපාඩු විස්තරාත්මකව ලියන්න
                  </small>
                </div>
              )}

              {/* Info Alert */}
              <div
                className="alert alert-info d-flex align-items-start"
                style={{ borderRadius: "8px" }}
              >
                <AlertCircle size={18} className="me-2 flex-shrink-0 mt-1" />
                <small>
                  ලිපිගොනු අඩුපාඩු නැතිනම් පමණක් තීරක ගාස්තුව ගෙවීමට හැකියාව
                  ලැබේ
                </small>
              </div>

              {/* Debug Info (can be removed in production) */}
              {(!submissionId || !borrower?.id) && (
                <div
                  className="alert alert-danger d-flex align-items-start"
                  style={{ borderRadius: "8px" }}
                >
                  <AlertCircle size={18} className="me-2 flex-shrink-0 mt-1" />
                  <div>
                    <strong>දෝෂය:</strong> අවශ්‍ය දත්ත නොමැත
                    <br />
                    <small className="text-muted">
                      Submission ID: {submissionId || "❌ නැත"}
                      <br />
                      Borrower ID: {borrower?.id || "❌ නැත"}
                    </small>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer bg-light border-top">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                අවලංගු කරන්න
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !deficiencyStatus ||
                  (deficiencyStatus === "FOUND" && !deficiencyDetails.trim())
                }
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    සුරකිමින්...
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="me-2" />
                    තහවුරු කරන්න
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeficiencyCheckModal;
