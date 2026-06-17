import React, { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  AlertCircle,
  Shield,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const purpleOverrides = `
  .btn-primary { background-color:#7c3aed!important; border-color:#6d28d9!important; }
  .btn-primary:hover { background-color:#9364de!important; border-color:#7b46d0!important; }
  .btn-primary:disabled { background-color:#a78bfa!important; border-color:#a78bfa!important; }
  .form-control:focus {
    border-color:#8b5cf6!important;
    box-shadow:0 0 0 .2rem rgba(139,92,246,.25)!important;
  }
  .settings-card {
    border-radius: 12px;
    border: 1px solid #e9ecef;
    box-shadow: 0 2px 12px rgba(118,71,165,0.08);
  }
  .settings-header {
    background: linear-gradient(135deg, #8662ab 0%, #bb99dd 100%);
    border-radius: 12px 12px 0 0;
    padding: 20px 24px;
  }
  .strength-bar {
    height: 6px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }
  .input-group .btn { border-color: #ced4da; }
  .input-group .btn:hover { background-color: #f8f9fa; }
`;

// Password strength checker
const getPasswordStrength = (password) => {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 6)  score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "ඉතා දුර්වල",  color: "#ef4444", width: "20%"  };
  if (score === 2) return { score, label: "දුර්වල",      color: "#f97316", width: "40%"  };
  if (score === 3) return { score, label: "සාමාන්‍ය",    color: "#eab308", width: "60%"  };
  if (score === 4) return { score, label: "ශක්තිමත්",   color: "#22c55e", width: "80%"  };
  return              { score, label: "ඉතා ශක්තිමත්",  color: "#16a34a", width: "100%" };
};

const SettingsPage = () => {
  const { user } = useAuth();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword:     "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    current: false,
    newPwd:  false,
    confirm: false,
  });
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState("");
  const [error,    setError]    = useState("");
  const [errors,   setErrors]   = useState({});

  const strength = getPasswordStrength(form.newPassword);

  const handleChange = (field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: "" }));
    setError("");
    setSuccess("");
  };

  const toggleShow = (field) =>
    setShow((p) => ({ ...p, [field]: !p[field] }));

  const validate = () => {
    const e = {};
    if (!form.currentPassword)
      e.currentPassword = "වත්මන් මුරපදය ඇතුළත් කරන්න";
    if (!form.newPassword)
      e.newPassword = "නව මුරපදය ඇතුළත් කරන්න";
    else if (form.newPassword.length < 6)
      e.newPassword = "මුරපදය අවම වශයෙන් අකුරු 6 ක් විය යුතුය";
    if (!form.confirmPassword)
      e.confirmPassword = "නව මුරපදය නැවත ඇතුළත් කරන්න";
    else if (form.newPassword !== form.confirmPassword)
      e.confirmPassword = "මුරපද ගැළපෙන්නේ නැත";
    if (form.currentPassword && form.newPassword &&
        form.currentPassword === form.newPassword)
      e.newPassword = "නව මුරපදය වත්මන් මුරපදයට සමාන විය නොහැක";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.changeOwnPassword({
        currentPassword: form.currentPassword,
        newPassword:     form.newPassword,
      });
      setSuccess("මුරපදය සාර්ථකව වෙනස් කරන ලදී!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "දෝෂයක් සිදු විය";
      // Backend sends 400 for wrong current password
      if (err.response?.status === 400 || msg.toLowerCase().includes("incorrect") ||
          msg.toLowerCase().includes("wrong") || msg.toLowerCase().includes("invalid")) {
        setErrors((p) => ({ ...p, currentPassword: "වත්මන් මුරපදය වැරදිය" }));
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const roleLabels = {
    SOCIETY_ADMIN:    "සමිති පරිපාලක",
    SOCIETY_APPROVAL: "සමිති අනුමත නිලධාරී",
    DISTRICT_ADMIN:   "දිස්ත්‍රික් පරිපාලක",
    PROVINCIAL_ADMIN: "පළාත් පරිපාලක",
    OFFICER:          "තීරක නිලධාරී",
    LEGAL_OFFICER:    "නීති නිලධාරී",
  };

  return (
    <div className="min-vh-100 p-3 p-md-4">
      <style>{purpleOverrides}</style>

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>

        {/* Page title */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark mb-1" style={{ fontSize: "1.75rem" }}>
            සැකසුම්
          </h2>
          <p className="text-muted mb-0">ගිණුම් සැකසුම් කළමනාකරණය කරන්න</p>
        </div>

        {/* ── Account Info Card ── */}
        <div className="settings-card card mb-4">
          <div className="settings-header">
            <h5 className="text-white fw-bold mb-0 d-flex align-items-center gap-2">
              <User size={20} />
              ගිණුම් තොරතුරු
            </h5>
          </div>
          <div className="card-body p-4">
            <div className="row g-3">
              <div className="col-md-6">
                <small className="text-muted d-block mb-1">නම</small>
                <div className="fw-semibold text-dark">{user?.name || "-"}</div>
              </div>
              <div className="col-md-6">
                <small className="text-muted d-block mb-1">විද්‍යුත් තැපෑල</small>
                <div className="fw-semibold text-dark">{user?.email || "-"}</div>
              </div>
              <div className="col-md-6">
                <small className="text-muted d-block mb-1">භූමිකාව</small>
                <div className="d-flex flex-wrap gap-1">
                  {user?.roles?.map((r) => (
                    <span
                      key={r}
                      className="badge"
                      style={{ background: "linear-gradient(135deg,#764d9e,#8a52c2)", fontSize: "12px" }}
                    >
                      {roleLabels[r] || r}
                    </span>
                  ))}
                </div>
              </div>
              {user?.designation && (
                <div className="col-md-6">
                  <small className="text-muted d-block mb-1">තනතුර</small>
                  <div className="fw-semibold text-dark">{user.designation}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Change Password Card ── */}
        <div className="settings-card card">
          <div className="settings-header">
            <h5 className="text-white fw-bold mb-0 d-flex align-items-center gap-2">
              <Lock size={20} />
              මුරපදය වෙනස් කරන්න
            </h5>
          </div>
          <div className="card-body p-4">

            {/* Alerts */}
            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 mb-4"
                style={{ borderRadius: "8px" }}>
                <XCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            {success && (
              <div className="alert alert-success d-flex align-items-center gap-2 mb-4"
                style={{ borderRadius: "8px" }}>
                <CheckCircle size={18} className="flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              {/* Current Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  වත්මන් මුරපදය <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={show.current ? "text" : "password"}
                    className={`form-control ${errors.currentPassword ? "is-invalid" : ""}`}
                    placeholder="වත්මන් මුරපදය ඇතුළත් කරන්න"
                    value={form.currentPassword}
                    onChange={(e) => handleChange("currentPassword", e.target.value)}
                    style={{ borderRadius: "6px 0 0 6px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => toggleShow("current")}
                    style={{ borderRadius: "0 6px 6px 0" }}
                    tabIndex={-1}
                  >
                    {show.current ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.currentPassword && (
                  <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                    <AlertCircle size={13} className="me-1" />
                    {errors.currentPassword}
                  </div>
                )}
              </div>

              {/* New Password */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  නව මුරපදය <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={show.newPwd ? "text" : "password"}
                    className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                    placeholder="නව මුරපදය ඇතුළත් කරන්න"
                    value={form.newPassword}
                    onChange={(e) => handleChange("newPassword", e.target.value)}
                    style={{ borderRadius: "6px 0 0 6px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => toggleShow("newPwd")}
                    style={{ borderRadius: "0 6px 6px 0" }}
                    tabIndex={-1}
                  >
                    {show.newPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Strength bar */}
                {form.newPassword && (
                  <div className="mt-2">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <small className="text-muted">මුරපද ශක්තිය:</small>
                      <small className="fw-semibold" style={{ color: strength.color }}>
                        {strength.label}
                      </small>
                    </div>
                    <div className="w-100 rounded" style={{ background: "#e9ecef", height: "6px" }}>
                      <div
                        className="strength-bar"
                        style={{ width: strength.width, background: strength.color }}
                      />
                    </div>
                    <div className="mt-2 d-flex flex-wrap gap-2">
                      {[
                        { ok: form.newPassword.length >= 6,        label: "අවම අකුරු 6" },
                        { ok: /[A-Z]/.test(form.newPassword),       label: "ලොකු අකුරු" },
                        { ok: /[0-9]/.test(form.newPassword),       label: "ඉලක්කම්"    },
                        { ok: /[^A-Za-z0-9]/.test(form.newPassword),label: "විශේෂ අකුරු"},
                      ].map((c) => (
                        <span
                          key={c.label}
                          style={{
                            fontSize: "11px",
                            padding: "2px 8px",
                            borderRadius: "10px",
                            background: c.ok ? "#dcfce7" : "#f1f5f9",
                            color:      c.ok ? "#166534" : "#94a3b8",
                            fontWeight: 500,
                          }}
                        >
                          {c.ok ? "✓" : "○"} {c.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {errors.newPassword && (
                  <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                    <AlertCircle size={13} className="me-1" />
                    {errors.newPassword}
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  නව මුරපදය තහවුරු කරන්න <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={show.confirm ? "text" : "password"}
                    className={`form-control ${errors.confirmPassword ? "is-invalid" : form.confirmPassword && form.newPassword === form.confirmPassword ? "is-valid" : ""}`}
                    placeholder="නව මුරපදය නැවත ඇතුළත් කරන්න"
                    value={form.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    style={{ borderRadius: "6px 0 0 6px" }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => toggleShow("confirm")}
                    style={{ borderRadius: "0 6px 6px 0" }}
                    tabIndex={-1}
                  >
                    {show.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.confirmPassword && form.newPassword === form.confirmPassword && !errors.confirmPassword && (
                  <div className="text-success mt-1" style={{ fontSize: "13px" }}>
                    <CheckCircle size={13} className="me-1" />
                    මුරපද ගැළපේ
                  </div>
                )}
                {errors.confirmPassword && (
                  <div className="text-danger mt-1" style={{ fontSize: "13px" }}>
                    <AlertCircle size={13} className="me-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              {/* Info box */}
              <div
                className="d-flex align-items-start gap-2 p-3 rounded mb-4"
                style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.18)" }}
              >
                <Shield size={16} style={{ color: "#7c3aed", flexShrink: 0, marginTop: "2px" }} />
                <small className="text-muted">
                  ශක්තිමත් මුරපදයක් සඳහා ලොකු අකුරු, ඉලක්කම් සහ විශේෂ අකුරු (&amp;, #, @ ආදිය)
                  ඇතුළත් කරන්න. මුරපදය අවම වශයෙන් අකුරු 6 ක් විය යුතුය.
                </small>
              </div>

              {/* Submit */}
              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 fw-semibold"
                  style={{ borderRadius: "8px" }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" />
                      වෙනස් කරමින්...
                    </>
                  ) : (
                    <>
                      <Lock size={16} className="me-2" />
                      මුරපදය වෙනස් කරන්න
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;