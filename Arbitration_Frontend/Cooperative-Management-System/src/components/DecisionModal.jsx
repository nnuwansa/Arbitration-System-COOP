import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  Percent,
  FileText,
  AlertCircle,
  TrendingDown,
} from "lucide-react";
import api from "../services/api";

const DecisionModal = ({
  show,
  onClose,
  borrower,
  submissionId,
  onSuccess,
}) => {
  const [decisionData, setDecisionData] = useState({
    decisionDate: new Date().toISOString().split("T")[0],
    proposedLoanBalance: borrower?.loanAmount || "",
    proposedLoanInterest: borrower?.interest || "",
    caseFees: "",
    proposedTotalAmount: "",
    forwardInterest: "",
    forwardInterestRate: "",
    deductionsFromLoanAmount: "",
    deductionsFromInterestAmount: "",
    arbitrationDecision: "",
  });

  const [appealDueDate, setAppealDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Calculate appeal due date (30 days, adjust for weekends)
  useEffect(() => {
    if (decisionData.decisionDate) {
      const dueDate = calculateAppealDueDate(
        new Date(decisionData.decisionDate)
      );
      setAppealDueDate(dueDate.toISOString().split("T")[0]);
    }
  }, [decisionData.decisionDate]);

  // Auto-calculate proposed total amount
  useEffect(() => {
    calculateTotalAmount();
  }, [
    decisionData.proposedLoanBalance,
    decisionData.proposedLoanInterest,
    decisionData.caseFees,
  ]);

  const calculateAppealDueDate = (decisionDate) => {
    const dueDate = new Date(decisionDate);
    dueDate.setDate(dueDate.getDate() + 30);

    // Check if weekend (Saturday=6, Sunday=0)
    const dayOfWeek = dueDate.getDay();

    if (dayOfWeek === 6) {
      // Saturday
      dueDate.setDate(dueDate.getDate() + 2); // Move to Monday
    } else if (dayOfWeek === 0) {
      // Sunday
      dueDate.setDate(dueDate.getDate() + 1); // Move to Monday
    }

    return dueDate;
  };

  const calculateTotalAmount = () => {
    const balance = parseFloat(decisionData.proposedLoanBalance) || 0;
    const interest = parseFloat(decisionData.proposedLoanInterest) || 0;
    const fees = parseFloat(decisionData.caseFees) || 0;

    const total = balance + interest + fees;
    setDecisionData((prev) => ({
      ...prev,
      proposedTotalAmount: total.toString(),
    }));
  };

  const handleChange = (field, value) => {
    setDecisionData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!decisionData.decisionDate) {
      newErrors.decisionDate = "තීරණ දුන් දිනය අනිවාර්ය වේ";
    }

    if (!decisionData.proposedLoanBalance) {
      newErrors.proposedLoanBalance = "ප්‍රස්තාවිත ණය ශේෂය අනිවාර්ය වේ";
    }

    if (!decisionData.proposedLoanInterest) {
      newErrors.proposedLoanInterest = "ප්‍රස්තාවිත ණය පොළිය අනිවාර්ය වේ";
    }

    if (!decisionData.arbitrationDecision) {
      newErrors.arbitrationDecision = "තීරණය / සටහන් අනිවාර්ය වේ";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async () => {
  //   if (!validateForm()) {
  //     alert("කරුණාකර සියලු අනිවාර්ය ක්ෂේත්‍ර පුරවන්න");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const payload = {
  //       ...decisionData,
  //       appealDueDate: appealDueDate,
  //     };

  //     await api.addDetailedArbitrationDecision(
  //       submissionId,
  //       borrower.id,
  //       payload
  //     );

  //     alert("තීරණය සාර්ථකව එකතු කරන ලදී!");
  //     onSuccess();
  //     onClose();
  //   } catch (err) {
  //     alert("දෝෂය: " + (err.response?.data?.message || err.message));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // In DecisionModal.jsx - Update the handleSubmit function:

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("කරුණාකර සියලු අනිවාර්ය ක්ෂේත්‍ර පුරවන්න");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        decisionDate: decisionData.decisionDate,
        proposedLoanBalance: parseFloat(decisionData.proposedLoanBalance) || 0,
        proposedLoanInterest:
          parseFloat(decisionData.proposedLoanInterest) || 0,
        caseFees: parseFloat(decisionData.caseFees) || 0,
        proposedTotalAmount: parseFloat(decisionData.proposedTotalAmount) || 0,
        forwardInterest: decisionData.forwardInterest
          ? parseFloat(decisionData.forwardInterest)
          : null,
        forwardInterestRate: decisionData.forwardInterestRate
          ? parseFloat(decisionData.forwardInterestRate)
          : null,
        deductionsFromLoanAmount: decisionData.deductionsFromLoanAmount
          ? parseFloat(decisionData.deductionsFromLoanAmount)
          : null,
        deductionsFromInterestAmount: decisionData.deductionsFromInterestAmount
          ? parseFloat(decisionData.deductionsFromInterestAmount)
          : null,
        arbitrationDecision: decisionData.arbitrationDecision,
        appealDueDate: appealDueDate,
      };

      // Log for debugging
      console.log("🔍 Sending decision payload:", payload);

      await api.addDetailedArbitrationDecision(
        submissionId,
        borrower.id,
        payload
      );

      alert("තීරණය සාර්ථකව එකතු කරන ලදී!");
      onSuccess();
      onClose();
    } catch (err) {
      console.error("❌ Decision submission error:", err);
      const errorMsg = err.response?.data?.message || err.message;
      alert("දෝෂය: " + errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!show || !borrower) return null;

  const originalLoanAmount = parseFloat(borrower.loanAmount || 0);
  const originalInterest = parseFloat(borrower.interest || 0);
  const proposedLoanBalance = parseFloat(decisionData.proposedLoanBalance) || 0;
  const proposedLoanInterest =
    parseFloat(decisionData.proposedLoanInterest) || 0;

  const interestReduction = originalInterest - proposedLoanInterest;
  const loanReduction = originalLoanAmount - proposedLoanBalance;

  return (
    <>
      <div
        className="modal-backdrop show"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        onClick={onClose}
      ></div>
      <div
        className="modal show d-block"
        style={{ zIndex: 1055 }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div
            className="modal-content shadow-lg border"
            style={{ borderRadius: "12px" }}
          >
            <div
              className="modal-header text-white"
              style={{
                borderRadius: "12px 12px 0 0",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <h5 className="modal-title fw-bold">
                <CheckCircle size={20} className="me-2" />
                තීරක නිලධාරියාගේ විස්තරාත්මක තීරණය
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={onClose}
              ></button>
            </div>

            <div className="modal-body p-4">
              {/* Borrower Information */}
              <div
                className="alert alert-info mb-4"
                style={{ borderRadius: "8px" }}
              >
                <h6 className="fw-bold mb-3">
                  <DollarSign size={18} className="me-2" />
                  ණයගැතියාගේ තොරතුරු
                </h6>
                <div className="row g-3">
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">නම:</small>
                    <div className="fw-semibold">{borrower.borrowerName}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">
                      ජාතිකත්ව අංකය:
                    </small>
                    <div className="fw-semibold">
                      {borrower.borrowerNIC || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">ණය අංකය:</small>
                    <div className="fw-semibold">{borrower.loanNumber}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">ණය වර්ගය:</small>
                    <div className="fw-semibold">
                      {borrower.loanType || "-"}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">ලිපිනය:</small>
                    <div>{borrower.borrowerAddress || "-"}</div>
                  </div>
                  <div className="col-md-6">
                    <small className="text-muted d-block mb-1">
                      සාමාජිකත්ව අංකය:
                    </small>
                    <div className="fw-semibold">
                      {borrower.membershipNo || "-"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Original Loan Details */}
              <div
                className="card mb-4"
                style={{ borderRadius: "8px", border: "1px solid #dee2e6" }}
              >
                <div
                  className="card-header bg-secondary text-white"
                  style={{ borderRadius: "8px 8px 0 0" }}
                >
                  <h6 className="mb-0 fw-bold">
                    <FileText size={16} className="me-2" />
                    මූල් ණය විස්තර
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-4">
                      <small className="text-muted d-block">
                        මුල් ණය මුදල:
                      </small>
                      <div className="fs-6 fw-bold text-primary">
                        රු.{" "}
                        {originalLoanAmount.toLocaleString("si-LK", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted d-block">මුල් පොළිය:</small>
                      <div className="fs-6 fw-bold text-warning">
                        රු.{" "}
                        {originalInterest.toLocaleString("si-LK", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <small className="text-muted d-block">
                        පොළී අනුපාතය:
                      </small>
                      <div className="fs-6 fw-bold text-info">
                        {borrower.interestRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision Date and Appeal Due Date */}
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <Calendar size={16} className="me-2" />
                    තීරණ දුන් දිනය <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className={`form-control ${
                      errors.decisionDate ? "is-invalid" : ""
                    }`}
                    value={decisionData.decisionDate}
                    onChange={(e) =>
                      handleChange("decisionDate", e.target.value)
                    }
                    style={{ borderRadius: "6px" }}
                    required
                  />
                  {errors.decisionDate && (
                    <div className="invalid-feedback d-block">
                      {errors.decisionDate}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    <Calendar size={16} className="me-2" />
                    අභියාචනය කල යුතු දිනය
                  </label>
                  <input
                    type="date"
                    className="form-control bg-light"
                    value={appealDueDate}
                    disabled
                    style={{ borderRadius: "6px" }}
                  />
                  <small className="text-muted d-block mt-1">
                    {/* ( තීරණ දුන් දිනය දින  30 කට පසු , ) */}
                  </small>
                </div>
              </div>

              {/* Proposed Loan Amounts */}
              <div
                className="card mb-4"
                style={{ borderRadius: "8px", border: "1px solid #dee2e6" }}
              >
                <div
                  className="card-header bg-primary text-white"
                  style={{ borderRadius: "8px 8px 0 0" }}
                >
                  <h6 className="mb-0 fw-bold">
                    <DollarSign size={16} className="me-2" />
                    ප්‍රදානිත ණය මුදල්
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        ප්‍රදානිත ණය ශේෂය (රු.)
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className={`form-control ${
                          errors.proposedLoanBalance ? "is-invalid" : ""
                        }`}
                        placeholder="0.00"
                        value={decisionData.proposedLoanBalance}
                        onChange={(e) =>
                          handleChange("proposedLoanBalance", e.target.value)
                        }
                        style={{ borderRadius: "6px" }}
                        required
                      />
                      {errors.proposedLoanBalance && (
                        <div className="invalid-feedback d-block">
                          {errors.proposedLoanBalance}
                        </div>
                      )}
                      {loanReduction > 0 && (
                        <small className="text-success d-block mt-1">
                          <TrendingDown size={12} className="me-1" />
                          අඩු කිරීම: රු.{" "}
                          {loanReduction.toLocaleString("si-LK", {
                            minimumFractionDigits: 2,
                          })}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        ප්‍රදානිත ණය පොළිය (රු.)
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className={`form-control ${
                          errors.proposedLoanInterest ? "is-invalid" : ""
                        }`}
                        placeholder="0.00"
                        value={decisionData.proposedLoanInterest}
                        onChange={(e) =>
                          handleChange("proposedLoanInterest", e.target.value)
                        }
                        style={{ borderRadius: "6px" }}
                        required
                      />
                      {errors.proposedLoanInterest && (
                        <div className="invalid-feedback d-block">
                          {errors.proposedLoanInterest}
                        </div>
                      )}
                      {interestReduction > 0 && (
                        <small className="text-success d-block mt-1">
                          <TrendingDown size={12} className="me-1" />
                          අඩු කිරීම: රු.{" "}
                          {interestReduction.toLocaleString("si-LK", {
                            minimumFractionDigits: 2,
                          })}
                        </small>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        නඩු ගාස්තු (රු.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="0.00"
                        value={decisionData.caseFees}
                        onChange={(e) =>
                          handleChange("caseFees", e.target.value)
                        }
                        style={{ borderRadius: "6px" }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        ප්‍රදානිත මුළු මුදල (රු.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control bg-light"
                        value={decisionData.proposedTotalAmount}
                        disabled
                        style={{ borderRadius: "6px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Forward Interest */}
              <div
                className="card mb-4"
                style={{ borderRadius: "8px", border: "1px solid #dee2e6" }}
              >
                <div
                  className="card-header bg-success text-white"
                  style={{ borderRadius: "8px 8px 0 0" }}
                >
                  <h6 className="mb-0 fw-bold">
                    <Percent size={16} className="me-2" />
                    ඉදිරියට පොළිය
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        ඉදිරියට පොළිය (රු.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="0.00"
                        value={decisionData.forwardInterest}
                        onChange={(e) =>
                          handleChange("forwardInterest", e.target.value)
                        }
                        style={{ borderRadius: "6px" }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        ඉදිරියට පොළී අනුපාතය (%)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="0.00"
                        value={decisionData.forwardInterestRate}
                        onChange={(e) =>
                          handleChange("forwardInterestRate", e.target.value)
                        }
                        style={{ borderRadius: "6px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Disbursement Deductions */}
              <div
                className="card mb-4"
                style={{ borderRadius: "8px", border: "1px solid #dee2e6" }}
              >
                <div
                  className="card-header bg-warning text-dark"
                  style={{ borderRadius: "8px 8px 0 0" }}
                >
                  <h6 className="mb-0 fw-bold">
                    <TrendingDown size={16} className="me-2" />
                    ප්‍රදානයේදී කපහැරීම්
                  </h6>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        ණය මුදලෙන් කපහැරීම (රු.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="0.00"
                        value={decisionData.deductionsFromLoanAmount}
                        onChange={(e) =>
                          handleChange(
                            "deductionsFromLoanAmount",
                            e.target.value
                          )
                        }
                        style={{ borderRadius: "6px" }}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        පොලියෙන් කපහැරීම (රු.)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        placeholder="0.00"
                        value={decisionData.deductionsFromInterestAmount}
                        onChange={(e) =>
                          handleChange(
                            "deductionsFromInterestAmount",
                            e.target.value
                          )
                        }
                        style={{ borderRadius: "6px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Decision/Notes */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <FileText size={16} className="me-2" />
                  තීරණය / සටහන්
                  <span className="text-danger">*</span>
                </label>
                <textarea
                  className={`form-control ${
                    errors.arbitrationDecision ? "is-invalid" : ""
                  }`}
                  rows="5"
                  placeholder="තීරණය / සටහන් මෙහි ඇතුළත් කරන්න..."
                  value={decisionData.arbitrationDecision}
                  onChange={(e) =>
                    handleChange("arbitrationDecision", e.target.value)
                  }
                  style={{ borderRadius: "6px" }}
                  required
                ></textarea>
                {errors.arbitrationDecision && (
                  <div className="invalid-feedback d-block">
                    {errors.arbitrationDecision}
                  </div>
                )}
              </div>

              {/* Info Alert */}
              <div
                className="alert alert-info d-flex align-items-start mb-0"
                style={{ borderRadius: "6px" }}
              >
                <AlertCircle size={18} className="me-2 flex-shrink-0 mt-1" />
                <div>
                  <strong className="d-block mb-1">සටහන:</strong>
                  <small className="text-muted">
                    සියලු අනිවාර්ය තොරතුරු (
                    <span className="text-danger">*</span>) පුරවීම අනිවාර්ය වේ.
                    කරුණාකර සියලු තොරතුරු නිවැරදිව පරීක්ෂා කර තහවුරු කරන්න.
                  </small>
                </div>
              </div>
            </div>

            <div className="modal-footer bg-light border-top p-3">
              <button
                type="button"
                className="btn btn-secondary px-4"
                onClick={onClose}
                disabled={loading}
              >
                <XCircle size={16} className="me-2" />
                අවලංගු කරන්න
              </button>
              <button
                type="button"
                className="btn px-4"
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  background:
                    "linear-gradient(135deg, #7287e8 0%, #b395d0 100%)",
                  color: "white",
                  border: "none",
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    සුරකින්න
                  </>
                ) : (
                  <>
                    <CheckCircle size={16} className="me-2" />
                    තීරණය සුරකින්න
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

export default DecisionModal;
