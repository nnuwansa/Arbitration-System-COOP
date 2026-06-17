// import React, { useState } from "react";
// import {
//   FileText,
//   XCircle,
//   CheckCircle,
//   AlertCircle,
//   Plus,
//   Edit,
//   Trash2,
//   Users,
//   DollarSign,
//   UserCheck,
//   Home,
//   Download,
//   Upload,
// } from "lucide-react";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";
// import * as XLSX from "xlsx";
// import "bootstrap/dist/css/bootstrap.min.css";


// const purpleOverrides = `
//   /* stat cards */
//   .cs-stat-1 { background: #6d28d9 !important; }
//   .cs-stat-2 { background: #5b21b6 !important; }
//   .cs-stat-3 { background: #7c3aed !important; }
//   .cs-stat-4 { background: #4c1d95 !important; }
//   .cs-stat-5 { background: #8b5cf6 !important; }

//   /* btn-primary (blue → purple) */
//   .btn-primary                    { background-color:#7c3aed!important; border-color:#6d28d9!important; }
//   .btn-primary:hover               { background-color:#6d28d9!important; border-color:#5b21b6!important; }
//   .btn-primary:focus,.btn-primary:active { background-color:#6d28d9!important; border-color:#5b21b6!important; }
//   .btn-primary:disabled            { background-color:#a78bfa!important; border-color:#a78bfa!important; }

//   /* btn-success (green → purple) */
//   .btn-success                    { background-color:#7c3aed!important; border-color:#6d28d9!important; }
//   .btn-success:hover               { background-color:#6d28d9!important; border-color:#5b21b6!important; }
//   .btn-success:focus,.btn-success:active { background-color:#6d28d9!important; border-color:#5b21b6!important; }
//   .btn-success:disabled            { background-color:#a78bfa!important; border-color:#a78bfa!important; }

//   /* btn-outline-primary */
//   .btn-outline-primary             { color:#7c3aed!important; border-color:#7c3aed!important; }
//   .btn-outline-primary:hover       { background-color:#7c3aed!important; color:#fff!important; }

//   /* card borders */
//   .card.border-success             { border-color:#7c3aed!important; }
//   .card.border-primary             { border-color:#6d28d9!important; }
//   .card.h-100.border-success.border-2 { border-color:#7c3aed!important; }
//   .card.h-100.border-primary.border-2 { border-color:#6d28d9!important; }

//   /* icon boxes inside excel section */
//   .bg-success.text-white.p-3.rounded { background-color:#7c3aed!important; }
//   .bg-success.bg-opacity-10          { background-color:rgba(124,58,237,.12)!important; }
//   .bg-primary.bg-opacity-10          { background-color:rgba(109,40,217,.12)!important; }

//   /* icon colours */
//   .text-success { color:#7c3aed!important; }
//   .text-primary  { color:#6d28d9!important; }
//   .text-warning  { color:#7c3aed!important; }

//   /* drag-drop zone */
//   .border-primary { border-color:#7c3aed!important; }

//   /* table header */
//   .table-light th { background-color:#ede9fe!important; color:#5b21b6!important; }

//   /* form focus */
//   .form-control:focus,.form-select:focus {
//     border-color:#8b5cf6!important;
//     box-shadow:0 0 0 .2rem rgba(139,92,246,.25)!important;
//   }

//   /* inline total chip */
//   .alert-info {
//     background-color:rgba(124,58,237,.08)!important;
//     border-color:rgba(124,58,237,.25)!important;
//     color:#5b21b6!important;
//   }
// `;

// const CreateSubmissionPage = () => {
//   const { user } = useAuth();
//   const [borrowers, setBorrowers] = useState([]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [editingBorrower, setEditingBorrower] = useState(null);
//   const [isDragging, setIsDragging] = useState(false);
//   const [currentBorrower, setCurrentBorrower] = useState({
//     loanNumber: "", borrowerName: "", borrowerNIC: "", borrowerAddress: "",
//     membershipNo: "", registrationDate: "", loanType: "",
//     guarantor1Name: "", guarantor1NIC: "", guarantor1MembershipNo: "", guarantor1Address: "",
//     guarantor2Name: "", guarantor2NIC: "", guarantor2MembershipNo: "", guarantor2Address: "",
//     loanAmount: "", outstandingLoanAmount: "", interest: "", interestRate: "", stationeryFees: "",
//   });

//   const loanTypes = [
//     { value: "ණය", label: "ණය" },
//     { value: "විවිධ", label: "විවිධ" },
//     { value: "තැන්පතු", label: "තැන්පතු" },
//   ];

//   const downloadExcelTemplate = () => {
//     const template = [
//       {
//         "ණය අංකය": "", "ණයගැතියාගේ නම": "", "ජාතික හැදුනුම්පත් අංකය (NIC)": "",
//         "සාමාජික අංකය": "", "ණය ලබාගත් දිනය (mm/dd/yyyy)": "", "ආරවුලේ ස්වභාවය": "",
//         "ණයගැතියාගේ ලිපිනය": "", "පළමු ඇපකරුගේ නම": "", "පළමු ඇපකරුගේ NIC": "",
//         "පළමු ඇපකරුගේ සාමාජික අංකය": "", "පළමු ඇපකරුගේ ලිපිනය": "",
//         "දෙවන ඇපකරුගේ නම": "", "දෙවන ඇපකරුගේ NIC": "", "දෙවන ඇපකරුගේ සාමාජික අංකය": "",
//         "දෙවන ඇපකරුගේ ලිපිනය": "", "ණය මුදල (රු.)": "", "හිඟ ණය ශේෂය (රු.)": "",
//         "හිඟ ණය පොළිය (රු.)": "", "පොළි අනුපාතය (%)": "", "ලිපිද්‍රව්‍ය හා නඩු ගාස්තු (රු.)": "",
//       },
//       {
//         "ණය අංකය": "L001", "ණයගැතියාගේ නම": "සමන් පෙරේරා",
//         "ජාතික හැදුනුම්පත් අංකය (NIC)": "199012345678", "සාමාජික අංකය": "M001",
//         "ණය ලබාගත් දිනය (mm/dd/yyyy)": "01/15/2024", "ආරවුලේ ස්වභාවය": "ණය",
//         "ණයගැතියාගේ ලිපිනය": "කොළඹ 07", "පළමු ඇපකරුගේ නම": "නිමල් සිල්වා",
//         "පළමු ඇපකරුගේ NIC": "198512345678", "පළමු ඇපකරුගේ සාමාජික අංකය": "M002",
//         "පළමු ඇපකරුගේ ලිපිනය": "කොළඹ 05", "දෙවන ඇපකරුගේ නම": "කමල් ප්‍රනාන්දු",
//         "දෙවන ඇපකරුගේ NIC": "198712345678", "දෙවන ඇපකරුගේ සාමාජික අංකය": "M003",
//         "දෙවන ඇපකරුගේ ලිපිනය": "කොළඹ 03", "ණය මුදල (රු.)": "100000",
//         "හිඟ ණය ශේෂය (රු.)": "75000", "හිඟ ණය පොළිය (රු.)": "5000",
//         "පොළි අනුපාතය (%)": "12", "ලිපිද්‍රව්‍ය හා නඩු ගාස්තු (රු.)": "500",
//       },
//     ];
//     const ws = XLSX.utils.json_to_sheet(template);
//     ws["!cols"] = Array(20).fill({ wch: 20 });
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "ණයගැතියන්");
//     XLSX.writeFile(wb, "ණයගැති_ඉදිරිපත් කිරීම_Template.xlsx");
//   };

//   const parseExcelFile = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       try {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheet = workbook.Sheets[workbook.SheetNames[0]];
//         const jsonData = XLSX.utils.sheet_to_json(sheet);

//         const borrowersData = jsonData
//           .filter((row) => row["ණය අංකය"] && row["ණය අංකය"] !== "")
//           .map((row, index) => {
//             let registrationDate = "";
//             const dateValue = row["ණය ලබාගත් දිනය (mm/dd/yyyy)"];
//             if (dateValue) {
//               if (typeof dateValue === "number") {
//                 const d = XLSX.SSF.parse_date_code(dateValue);
//                 registrationDate = `${d.y}-${String(d.m).padStart(2,"0")}-${String(d.d).padStart(2,"0")}`;
//               } else if (typeof dateValue === "string") {
//                 const p = new Date(dateValue);
//                 if (!isNaN(p)) registrationDate = `${p.getFullYear()}-${String(p.getMonth()+1).padStart(2,"0")}-${String(p.getDate()).padStart(2,"0")}`;
//               }
//             }
//             return {
//               id: Date.now() + index,
//               loanNumber: String(row["ණය අංකය"] || ""),
//               borrowerName: String(row["ණයගැතියාගේ නම"] || ""),
//               borrowerNIC: String(row["ජාතික හැදුනුම්පත් අංකය (NIC)"] || ""),
//               membershipNo: String(row["සාමාජික අංකය"] || ""),
//               registrationDate,
//               loanType: String(row["ආරවුලේ ස්වභාවය"] || ""),
//               borrowerAddress: String(row["ණයගැතියාගේ ලිපිනය"] || ""),
//               guarantor1Name: String(row["පළමු ඇපකරුගේ නම"] || ""),
//               guarantor1NIC: String(row["පළමු ඇපකරුගේ NIC"] || ""),
//               guarantor1MembershipNo: String(row["පළමු ඇපකරුගේ සාමාජික අංකය"] || ""),
//               guarantor1Address: String(row["පළමු ඇපකරුගේ ලිපිනය"] || ""),
//               guarantor2Name: String(row["දෙවන ඇපකරුගේ නම"] || ""),
//               guarantor2NIC: String(row["දෙවන ඇපකරුගේ NIC"] || ""),
//               guarantor2MembershipNo: String(row["දෙවන ඇපකරුගේ සාමාජික අංකය"] || ""),
//               guarantor2Address: String(row["දෙවන ඇපකරුගේ ලිපිනය"] || ""),
//               loanAmount: String(row["ණය මුදල (රු.)"] || ""),
//               outstandingLoanAmount: String(row["හිඟ ණය ශේෂය (රු.)"] || ""),
//               interest: String(row["හිඟ ණය පොළිය (රු.)"] || ""),
//               interestRate: String(row["පොළි අනුපාතය (%)"] || ""),
//               stationeryFees: String(row["ලිපිද්‍රව්‍ය හා නඩු ගාස්තු (රු.)"] || ""),
//             };
//           });

//         if (!borrowersData.length) { setError("Excel ගොනුවේ වලංගු දත්ත හමු නොවීය"); return; }
//         setBorrowers((prev) => [...prev, ...borrowersData]);
//         setSuccess(`${borrowersData.length} ණයගැතියන් සාර්ථකව එකතු කරන ලදී!`);
//         setError("");
//       } catch (err) {
//         console.error(err);
//         setError("Excel ගොනුව සැකසීමේ දෝෂයක් සිදු විය");
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault(); setIsDragging(false);
//     const file = e.dataTransfer.files[0];
//     if (file?.name?.endsWith(".xlsx")) parseExcelFile(file);
//     else setError("කරුණාකර වලංගු Excel ගොනුවක් (.xlsx) උඩුගත කරන්න");
//   };
//   const handleFileInput = (e) => { if (e.target.files[0]) parseExcelFile(e.target.files[0]); e.target.value = ""; };
//   const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true); };
//   const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };

//   const resetForm = () => {
//     setCurrentBorrower({
//       loanNumber:"",borrowerName:"",borrowerNIC:"",borrowerAddress:"",membershipNo:"",
//       registrationDate:"",loanType:"",guarantor1Name:"",guarantor1NIC:"",
//       guarantor1MembershipNo:"",guarantor1Address:"",guarantor2Name:"",guarantor2NIC:"",
//       guarantor2MembershipNo:"",guarantor2Address:"",loanAmount:"",
//       outstandingLoanAmount:"",interest:"",interestRate:"",stationeryFees:"",
//     });
//     setEditingBorrower(null); setShowAddForm(false);
//   };

//   const handleAddBorrower = () => {
//     if (!currentBorrower.loanNumber || !currentBorrower.borrowerName) { alert("කරුණාකර අවම වශයෙන් ණය අංකය සහ නම පුරවන්න"); return; }
//     if (!currentBorrower.registrationDate) { alert("කරුණාකර ලියාපදිංචි වූ දිනය තෝරන්න"); return; }
//     if (editingBorrower !== null) {
//       const updated = [...borrowers]; updated[editingBorrower] = { ...currentBorrower, id: Date.now() }; setBorrowers(updated);
//     } else { setBorrowers([...borrowers, { ...currentBorrower, id: Date.now() }]); }
//     resetForm();
//   };

//   const handleEditBorrower   = (i) => { setCurrentBorrower(borrowers[i]); setEditingBorrower(i); setShowAddForm(true); window.scrollTo({ top:0, behavior:"smooth" }); };
//   const handleDeleteBorrower = (i) => { if (window.confirm("මෙම ණයගැතියා ඉවත් කරන්නද?")) setBorrowers(borrowers.filter((_,j)=>j!==i)); };

//   const handleSubmit = async () => {
//     if (!borrowers.length) { setError("කරුණාකර අවම වශයෙන් එක් ණයගැතියෙකු එක් කරන්න"); return; }
//     setError(""); setSuccess(""); setLoading(true);
//     try {
//       const districtId = user.districtId || user.district;
//       const societyId  = user.societyId  || user.society;
//       if (!districtId || !societyId) throw new Error("User missing districtId or societyId. Please log out and log back in.");
//       await api.createSubmission({
//         districtId, societyId,
//         borrowers: borrowers.map(({ id, ...b }) => ({
//           ...b,
//           loanAmount: parseFloat(b.loanAmount)||0,
//           outstandingLoanAmount: parseFloat(b.outstandingLoanAmount)||0,
//           interest: parseFloat(b.interest)||0,
//           interestRate: parseFloat(b.interestRate)||0,
//           stationeryFees: parseFloat(b.stationeryFees)||0,
//         })),
//       });
//       setSuccess("ඉදිරිපත් කිරීම සාර්ථකව සාදන ලදී!"); setBorrowers([]); window.scrollTo(0,0);
//     } catch (err) { console.error(err); setError(err.message||"An error occurred while creating the submission"); }
//     finally { setLoading(false); }
//   };

//   const calculateTotal  = (b) => (parseFloat(b.outstandingLoanAmount)||0)+(parseFloat(b.interest)||0)+(parseFloat(b.stationeryFees)||0);
//   const getTotalLoan    = () => borrowers.reduce((s,b)=>s+(parseFloat(b.loanAmount)||0),0);
//   const getTotalOut     = () => borrowers.reduce((s,b)=>s+(parseFloat(b.outstandingLoanAmount)||0),0);
//   const getTotalInt     = () => borrowers.reduce((s,b)=>s+(parseFloat(b.interest)||0),0);
//   const getTotalFees    = () => borrowers.reduce((s,b)=>s+(parseFloat(b.stationeryFees)||0),0);
//   const getGrandTotal   = () => getTotalOut()+getTotalInt()+getTotalFees();

//   const field = (key) => (e) => setCurrentBorrower(p=>({...p,[key]:e.target.value}));

//   return (
//     <div className="min-vh-100 p-4">
//       <style>{purpleOverrides}</style>

//       <div className="container-fluid" style={{ maxWidth:"1400px" }}>

//         {/* Page Title */}
//         <div className="mb-4">
//           <h2 className="fw-bold text-dark" style={{ fontSize:"2rem" }}>
//             තීරකකරණය සදහා ණය ගොනු ඉදිරිපත් කිරීම
//           </h2>
//           <p className="text-muted" style={{ fontSize:"1.1rem" }}>
//             තීරකකරණය සදහා ඉදිරිපත් කළ යුතු ණයගැතියන්ගේ තොරතුරු
//           </p>
//         </div>

//         {/* Stat Cards */}
//         {borrowers.length > 0 && (
//           <div className="row g-3 mb-4">
//             {[
//               { cls:"cs-stat-1", icon:<Users size={28}/>,      label:"එකතු කළ ණයගැතියන්", val:borrowers.length,                              big:true },
//               { cls:"cs-stat-2", icon:<DollarSign size={28}/>, label:"මුළු ණය",            val:`රු. ${getTotalLoan().toLocaleString("si-LK")}` },
//               { cls:"cs-stat-3", icon:<DollarSign size={28}/>, label:"මුළු බාකි ණය",       val:`රු. ${getTotalOut().toLocaleString("si-LK")}`  },
//               { cls:"cs-stat-4", icon:<DollarSign size={28}/>, label:"මුළු පොළිය",         val:`රු. ${getTotalInt().toLocaleString("si-LK")}`  },
//               { cls:"cs-stat-5", icon:<DollarSign size={28}/>, label:"මුළු වටිනාකම",       val:`රු. ${getGrandTotal().toLocaleString("si-LK")}`},
//             ].map((s,i)=>(
//               <div key={i} className="col-lg col-md-4 col-sm-6">
//                 <div className={`card text-white shadow ${s.cls}`}>
//                   <div className="card-body">
//                     <div className="opacity-75 mb-2">{s.icon}</div>
//                     <p className="small mb-1 opacity-75">{s.label}</p>
//                     {s.big ? <h3 className="mb-0">{s.val}</h3> : <h5 className="mb-0">{s.val}</h5>}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Info Alert */}
//         <div className="alert alert-info border-start border-1 border-info mb-4">
//           <div className="d-flex align-items-start">
//             <AlertCircle size={20} className="me-3 flex-shrink-0 mt-1" />
//             <div>ණයගැතියන් පිළිබඳ තොරතුරු එකතු කර සමිති අනුමත කිරීමේ නිලධාරියා වෙත යවනු ලැබේ.</div>
//           </div>
//         </div>

//         {error   && <div className="alert alert-danger  border-start border-4 border-danger"> <div className="d-flex align-items-start"><XCircle    size={24} className="me-3 flex-shrink-0"/><div>{error}</div></div></div>}
//         {success && <div className="alert alert-success border-start border-4 border-success"><div className="d-flex align-items-start"><CheckCircle size={24} className="me-3 flex-shrink-0"/><div>{success}</div></div></div>}

//         {/* Add / Edit Form */}
//         {showAddForm && (
//           <div className="card shadow-lg mb-4">
//             <div className="card-header bg-white border-bottom">
//               <h2 className="h4 mb-0">{editingBorrower!==null?"🖊️ ණයගැතියා සංස්කරණය කරන්න":"➕ නව ණයගැතියෙකු එකතු කරන්න"}</h2>
//             </div>
//             <div className="card-body">

//               {/* Basic Info */}
//               <div className="mb-4">
//                 <h5 className="d-flex align-items-center mb-3">
//                   <Home className="text-primary me-2" size={20}/>මූලික තොරතුරු
//                 </h5>
//                 <div className="row g-3">
//                   {[
//                     ["ණය අංකය","loanNumber","text","ණය අංකය"],
//                     ["ණයගැතියාගේ නම","borrowerName","text","සම්පූර්ණ නම"],
//                     ["ජාතික හැදුනුම්පත් (NIC)","borrowerNIC","text","NIC"],
//                     ["සාමාජික අංකය","membershipNo","text","සාමාජික අංකය"],
//                     ["ණය ලබාගත් දිනය","registrationDate","date",""],
//                     ["ණයගැතියාගේ ලිපිනය","borrowerAddress","text","ලිපිනය"],
//                   ].map(([label,key,type,ph])=>(
//                     <div key={key} className="col-md-3">
//                       <label className="form-label fw-semibold">{label} <span className="text-danger">*</span></label>
//                       <input type={type} className="form-control" value={currentBorrower[key]} onChange={field(key)} placeholder={ph} required/>
//                     </div>
//                   ))}
//                   <div className="col-md-3">
//                     <label className="form-label fw-semibold">ආරවුලේ ස්වභාවය <span className="text-danger">*</span></label>
//                     <select className="form-select" value={currentBorrower.loanType} onChange={field("loanType")} required>
//                       <option value="">ආරවුලේ ස්වභාවය තෝරන්න</option>
//                       {loanTypes.map(t=><option key={t.value} value={t.value}>{t.label}</option>)}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Guarantor 1 — purple tint */}
//               <div className="mb-4 p-3 rounded"
//                 style={{ background:"rgba(109,40,217,0.06)", border:"1px solid rgba(124,58,237,0.2)" }}>
//                 <h5 className="d-flex align-items-center mb-3" style={{ color:"#6d28d9" }}>
//                   <UserCheck size={20} className="me-2" style={{ color:"#7c3aed" }}/>පළමු ඇපකරු විස්තර
//                 </h5>
//                 <div className="row g-3">
//                   {[["නම","guarantor1Name"],["NIC","guarantor1NIC"],["සාමාජික අංකය","guarantor1MembershipNo"],["ලිපිනය","guarantor1Address"]].map(([l,k])=>(
//                     <div key={k} className="col-md-3">
//                       <label className="form-label fw-semibold">{l} <span className="text-danger">*</span></label>
//                       <input type="text" className="form-control" value={currentBorrower[k]} onChange={field(k)} required/>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Guarantor 2 — lighter purple tint */}
//               <div className="mb-4 p-3 rounded"
//                 style={{ background:"rgba(139,92,246,0.06)", border:"1px solid rgba(167,139,250,0.25)" }}>
//                 <h5 className="d-flex align-items-center mb-3" style={{ color:"#7c3aed" }}>
//                   <UserCheck size={20} className="me-2" style={{ color:"#8b5cf6" }}/>දෙවන ඇපකරු විස්තර
//                 </h5>
//                 <div className="row g-3">
//                   {[["නම","guarantor2Name"],["NIC","guarantor2NIC"],["සාමාජික අංකය","guarantor2MembershipNo"],["ලිපිනය","guarantor2Address"]].map(([l,k])=>(
//                     <div key={k} className="col-md-3">
//                       <label className="form-label fw-semibold">{l} <span className="text-danger">*</span></label>
//                       <input type="text" className="form-control" value={currentBorrower[k]} onChange={field(k)} required/>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Financial */}
//               <div className="mb-4 p-3 rounded"
//                 style={{ background:"rgba(124,58,237,0.05)", border:"1px solid rgba(124,58,237,0.18)" }}>
//                 <h5 className="d-flex align-items-center mb-3">
//                   <DollarSign className="text-primary me-2" size={20}/>මුල්‍ය තොරතුරු
//                 </h5>
//                 <div className="row g-3">
//                   {[
//                     ["ණය මුදල (රු.)","loanAmount"],
//                     ["හිඟ ණය ශේෂය","outstandingLoanAmount"],
//                     ["හිඟ ණය පොළිය (රු.)","interest"],
//                     ["පොළි අනුපාතය (%)","interestRate"],
//                     ["ලිපිද්‍රව්‍ය හා නඩු ගාස්තු (රු.)","stationeryFees"],
//                   ].map(([l,k])=>(
//                     <div key={k} className="col-md-2">
//                       <label className="form-label fw-semibold">{l} <span className="text-danger">*</span></label>
//                       <input type="number" step="0.01" className="form-control" value={currentBorrower[k]} onChange={field(k)} placeholder="0.00" required/>
//                     </div>
//                   ))}
//                   <div className="col-md-2 d-flex align-items-end">
//                     <div className="alert alert-info w-100 mb-0">
//                       <small className="fw-semibold">මුළු වටිනාකම:</small>
//                       <div className="h5 mb-0">රු. {calculateTotal(currentBorrower).toLocaleString("si-LK")}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex gap-2 justify-content-end">
//                 <button onClick={resetForm} className="btn btn-secondary">අවලංගු කරන්න</button>
//                 <button onClick={handleAddBorrower} className="btn btn-primary">
//                   {editingBorrower!==null
//                     ? <><Edit size={18} className="me-2"/>යාවත්කාලීන කරන්න</>
//                     : <><Plus size={18} className="me-2"/>එකතු කරන්න</>}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Add CTA */}
//         {!showAddForm && (
//           <div className="mb-4">
//             <button onClick={()=>setShowAddForm(true)} className="btn btn-primary btn-lg w-100 shadow-lg">
//               <Plus size={24} className="me-2"/>නව ණයගැතියෙකු එකතු කරන්න
//             </button>
//           </div>
//         )}

//         {/* Borrowers Table */}
//         {borrowers.length > 0 && (
//           <div className="card shadow-lg mb-4">
//             <div className="card-header bg-white border-bottom">
//               <h2 className="h4 mb-0">එකතු කළ ණයගැතියන් ({borrowers.length})</h2>
//             </div>
//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-hover mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>#</th><th>ණය අංකය</th><th>නම</th><th>NIC</th>
//                       <th className="text-end">ණය මුදල</th><th className="text-end">මුළු වටිනාකම</th>
//                       <th className="text-center">ක්‍රියා</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {borrowers.map((b,i)=>(
//                       <tr key={b.id}>
//                         <td>{i+1}</td>
//                         <td className="fw-semibold">{b.loanNumber}</td>
//                         <td>{b.borrowerName}</td>
//                         <td className="text-muted">{b.borrowerNIC}</td>
//                         <td className="text-end">රු. {parseFloat(b.loanAmount||0).toLocaleString("si-LK")}</td>
//                         <td className="text-end fw-bold text-primary">රු. {calculateTotal(b).toLocaleString("si-LK")}</td>
//                         <td className="text-center">
//                           <div className="btn-group btn-group-sm">
//                             <button onClick={()=>handleEditBorrower(i)} className="btn btn-outline-primary" title="සංස්කරණය"><Edit size={16}/></button>
//                             <button onClick={()=>handleDeleteBorrower(i)} className="btn btn-outline-danger"  title="ඉවත්"><Trash2 size={16}/></button>
//                           </div>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Excel Section */}
//         <div className="card shadow-lg mb-4 border-success border-2">
//           <div className="card-body">
//             <div className="d-flex align-items-center mb-3">
//               <div className="bg-success text-white p-3 rounded me-3"><FileText size={20}/></div>
//               <div>
//                 <h5 className="h4 mb-1">Excel භාවිතයෙන් ණයගැතියන් පිළිබඳ තොරතුරු එකතු කර ඉදිරිපත් කිරීම</h5>
//                 <p className="text-muted mb-0 small">Template බාගත කර එය සම්පූර්ණ කර උඩුගත කරන්න</p>
//               </div>
//             </div>

//             <div className="row g-3">
//               {/* Download */}
//               <div className="col-md-6">
//                 <div className="card h-100 border-success border-2">
//                   <div className="card-body">
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="bg-success bg-opacity-10 p-2 rounded me-2">
//                         <Download className="text-success" size={24}/>
//                       </div>
//                       <div>
//                         <h6 className="card-title mb-0">පියවර 1: Template බාගත කරගන්න</h6>
//                         <p className="text-muted small mb-0">Excel ගොනුව බාගත කර විවෘත කරන්න</p>
//                       </div>
//                     </div>
//                     <button onClick={downloadExcelTemplate} className="btn btn-success w-100 d-flex align-items-center justify-content-center">
//                       <Download size={20} className="me-2"/>Template බාගත කරගන්න
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* Upload */}
//               <div className="col-md-6">
//                 <div className="card h-100 border-primary border-2">
//                   <div className="card-body">
//                     <div className="d-flex align-items-center mb-3">
//                       <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
//                         <Upload className="text-primary" size={24}/>
//                       </div>
//                       <div>
//                         <h6 className="card-title mb-0">පියවර 2: ගොනුව උඩුගත කරන්න</h6>
//                         <p className="text-muted small mb-0">සම්පූර්ණ කළ Excel ගොනුව තෝරන්න</p>
//                       </div>
//                     </div>
//                     <div
//                       onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
//                       className={`border border-2 rounded p-4 text-center ${isDragging?"border-primary bg-primary bg-opacity-10":"border-primary border-opacity-50 bg-light"}`}
//                       style={{ cursor:"pointer" }}>
//                       <Upload className={isDragging?"text-primary":"text-primary text-opacity-75"} size={32}/>
//                       <p className="small fw-semibold mb-2 mt-2">ගොනුව මෙහි දමන්න හෝ</p>
//                       <label className="btn btn-primary btn-sm mb-0">
//                         ගොනුවක් තෝරන්න
//                         <input type="file" accept=".xlsx" onChange={handleFileInput} className="d-none"/>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="alert border-start border-2 border-warning mt-3 mb-0">
//               <div className="d-flex align-items-start">
//                 <AlertCircle size={18} className="me-2 flex-shrink-0 mt-1"/>
//                 <small><strong>ඉඟිය:</strong> Excel ගොනුවේ දත්ත නිවැරදිව පුරවා ඇති බවට වග බලා ගන්න. සියලුම අවශ්‍ය තීරු (* ලකුණ සහිතව) අනිවාර්යයෙන් පුරවන්න.</small>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Submit */}
//         {borrowers.length > 0 && (
//           <div className="card shadow-lg">
//             <div className="card-body">
//               <button onClick={handleSubmit} disabled={loading}
//                 className={`btn btn-lg w-100 ${loading?"btn-secondary":"btn-success"}`}>
//                 {loading
//                   ? <><span className="spinner-border spinner-border-sm me-2"/>ඉදිරිපත් කරමින්...</>
//                   : `✓ සමිති අනුමත කිරීමේ නිලධාරියා වෙත ඉදිරිපත් කරන්න (ණයගැතියන් ${borrowers.length})`}
//               </button>
//             </div>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default CreateSubmissionPage;


import React, { useState } from "react";
import {
  FileText,
  XCircle,
  CheckCircle,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  Users,
  DollarSign,
  UserCheck,
  Home,
  Download,
  Upload,
  Calendar,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";


const purpleOverrides = `
  /* stat cards */
  .cs-stat-1 { background: #6d28d9 !important; }
  .cs-stat-2 { background: #5b21b6 !important; }
  .cs-stat-3 { background: #7c3aed !important; }
  .cs-stat-4 { background: #4c1d95 !important; }
  .cs-stat-5 { background: #8b5cf6 !important; }

  /* btn-primary (blue → purple) */
  .btn-primary                    { background-color:#7c3aed!important; border-color:#6d28d9!important; }
  .btn-primary:hover               { background-color:#6d28d9!important; border-color:#5b21b6!important; }
  .btn-primary:focus,.btn-primary:active { background-color:#6d28d9!important; border-color:#5b21b6!important; }
  .btn-primary:disabled            { background-color:#a78bfa!important; border-color:#a78bfa!important; }

  /* btn-success (green → purple) */
  .btn-success                    { background-color:#7c3aed!important; border-color:#6d28d9!important; }
  .btn-success:hover               { background-color:#6d28d9!important; border-color:#5b21b6!important; }
  .btn-success:focus,.btn-success:active { background-color:#6d28d9!important; border-color:#5b21b6!important; }
  .btn-success:disabled            { background-color:#a78bfa!important; border-color:#a78bfa!important; }

  /* btn-outline-primary */
  .btn-outline-primary             { color:#7c3aed!important; border-color:#7c3aed!important; }
  .btn-outline-primary:hover       { background-color:#7c3aed!important; color:#fff!important; }

  /* card borders */
  .card.border-success             { border-color:#7c3aed!important; }
  .card.border-primary             { border-color:#6d28d9!important; }
  .card.h-100.border-success.border-2 { border-color:#7c3aed!important; }
  .card.h-100.border-primary.border-2 { border-color:#6d28d9!important; }

  /* icon boxes inside excel section */
  .bg-success.text-white.p-3.rounded { background-color:#7c3aed!important; }
  .bg-success.bg-opacity-10          { background-color:rgba(124,58,237,.12)!important; }
  .bg-primary.bg-opacity-10          { background-color:rgba(109,40,217,.12)!important; }

  /* icon colours */
  .text-success { color:#7c3aed!important; }
  .text-primary  { color:#6d28d9!important; }
  .text-warning  { color:#7c3aed!important; }

  /* drag-drop zone */
  .border-primary { border-color:#7c3aed!important; }

  /* table header */
  .table-light th { background-color:#ede9fe!important; color:#5b21b6!important; }

  /* form focus */
  .form-control:focus,.form-select:focus {
    border-color:#8b5cf6!important;
    box-shadow:0 0 0 .2rem rgba(139,92,246,.25)!important;
  }

  /* inline total chip */
  .alert-info {
    background-color:rgba(124,58,237,.08)!important;
    border-color:rgba(124,58,237,.25)!important;
    color:#5b21b6!important;
  }

  /* interest period box */
  .interest-period-box {
    background: linear-gradient(135deg,#f0fdf4 0%,#f8fff8 100%);
    border: 1px solid #bbf7d0;
    border-radius: 8px;
    padding: 14px 16px;
  }
  .interest-period-box .period-label {
    font-size: 12px;
    font-weight: 700;
    color: #166534;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 10px;
  }
  .days-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
  }
  .days-badge.ok  { background:#dcfce7; color:#166534; }
  .days-badge.err { background:#fee2e2; color:#991b1b; }
`;

// ─── Helper: calculate days between two ISO date strings ───────
const calcDays = (from, to) => {
  if (!from || !to) return null;
  const diff = Math.round(
    (new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)
  );
  return diff >= 0 ? diff : -1;
};

// ─── Helper: parse an Excel date cell to YYYY-MM-DD string ────
const parseExcelDate = (value) => {
  if (!value) return "";
  if (typeof value === "number") {
    const d = XLSX.SSF.parse_date_code(value);
    return `${d.y}-${String(d.m).padStart(2, "0")}-${String(d.d).padStart(2, "0")}`;
  }
  if (typeof value === "string") {
    const p = new Date(value);
    if (!isNaN(p))
      return `${p.getFullYear()}-${String(p.getMonth() + 1).padStart(2, "0")}-${String(p.getDate()).padStart(2, "0")}`;
  }
  return "";
};

// ─── Empty borrower template ──────────────────────────────────
const EMPTY_BORROWER = {
  loanNumber: "", borrowerName: "", borrowerNIC: "", borrowerAddress: "",
  membershipNo: "", registrationDate: "", loanType: "",
  guarantor1Name: "", guarantor1NIC: "", guarantor1MembershipNo: "", guarantor1Address: "",
  guarantor2Name: "", guarantor2NIC: "", guarantor2MembershipNo: "", guarantor2Address: "",
  loanAmount: "", outstandingLoanAmount: "",
  interest: "",
  interestFromDate: "",   // ⭐ NEW
  interestToDate: "",     // ⭐ NEW
  interestRate: "", stationeryFees: "",
};

// ─── Excel column headers (must match template exactly) ────────
const COL = {
  loanNumber:            "ණය අංකය",
  borrowerName:          "ණයගැතියාගේ නම",
  borrowerNIC:           "ජාතික හැදුනුම්පත් අංකය (NIC)",
  membershipNo:          "සාමාජික අංකය",
  registrationDate:      "ණය ලබාගත් දිනය (mm/dd/yyyy)",
  loanType:              "ආරවුලේ ස්වභාවය",
  borrowerAddress:       "ණයගැතියාගේ ලිපිනය",
  guarantor1Name:        "පළමු ඇපකරුගේ නම",
  guarantor1NIC:         "පළමු ඇපකරුගේ NIC",
  guarantor1MembershipNo:"පළමු ඇපකරුගේ සාමාජික අංකය",
  guarantor1Address:     "පළමු ඇපකරුගේ ලිපිනය",
  guarantor2Name:        "දෙවන ඇපකරුගේ නම",
  guarantor2NIC:         "දෙවන ඇපකරුගේ NIC",
  guarantor2MembershipNo:"දෙවන ඇපකරුගේ සාමාජික අංකය",
  guarantor2Address:     "දෙවන ඇපකරුගේ ලිපිනය",
  loanAmount:            "ණය මුදල (රු.)",
  outstandingLoanAmount: "හිඟ ණය ශේෂය (රු.)",
  interest:              "හිඟ ණය පොළිය (රු.)",
  interestFromDate:      "පොළිය ආරම්භ දිනය (mm/dd/yyyy)",   // ⭐ NEW
  interestToDate:        "පොළිය අවසාන දිනය (mm/dd/yyyy)",   // ⭐ NEW
  interestRate:          "පොළි අනුපාතය (%)",
  stationeryFees:        "ලිපිද්‍රව්‍ය හා නඩු ගාස්තු (රු.)",
};

const CreateSubmissionPage = () => {
  const { user } = useAuth();
  const [borrowers, setBorrowers]           = useState([]);
  const [success, setSuccess]               = useState("");
  const [error, setError]                   = useState("");
  const [loading, setLoading]               = useState(false);
  const [showAddForm, setShowAddForm]       = useState(false);
  const [editingBorrower, setEditingBorrower] = useState(null);
  const [isDragging, setIsDragging]         = useState(false);
  const [currentBorrower, setCurrentBorrower] = useState({ ...EMPTY_BORROWER });

  const loanTypes = [
    { value: "ණය",     label: "ණය"     },
    { value: "විවිධ",  label: "විවිධ"  },
    { value: "තැන්පතු",label: "තැන්පතු"},
  ];

  // ── Download Excel Template ────────────────────────────────
  const downloadExcelTemplate = () => {
    const header = {};
    Object.values(COL).forEach((h) => (header[h] = ""));

    const example = {
      [COL.loanNumber]:            "L001",
      [COL.borrowerName]:          "සමන් පෙරේරා",
      [COL.borrowerNIC]:           "199012345678",
      [COL.membershipNo]:          "M001",
      [COL.registrationDate]:      "01/15/2024",
      [COL.loanType]:              "ණය",
      [COL.borrowerAddress]:       "කොළඹ 07",
      [COL.guarantor1Name]:        "නිමල් සිල්වා",
      [COL.guarantor1NIC]:         "198512345678",
      [COL.guarantor1MembershipNo]:"M002",
      [COL.guarantor1Address]:     "කොළඹ 05",
      [COL.guarantor2Name]:        "කමල් ප්‍රනාන්දු",
      [COL.guarantor2NIC]:         "198712345678",
      [COL.guarantor2MembershipNo]:"M003",
      [COL.guarantor2Address]:     "කොළඹ 03",
      [COL.loanAmount]:            "100000",
      [COL.outstandingLoanAmount]: "75000",
      [COL.interest]:              "5000",
      [COL.interestFromDate]:      "01/01/2023",   // ⭐ NEW example
      [COL.interestToDate]:        "12/31/2023",   // ⭐ NEW example
      [COL.interestRate]:          "12",
      [COL.stationeryFees]:        "500",
    };

    const ws = XLSX.utils.json_to_sheet([header, example]);
    // Make the two new date columns a bit wider
    ws["!cols"] = Array(Object.keys(COL).length).fill({ wch: 22 });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "ණයගැතියන්");
    XLSX.writeFile(wb, "ණයගැති_ඉදිරිපත් කිරීම_Template.xlsx");
  };

  // ── Parse uploaded Excel ──────────────────────────────────
  const parseExcelFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data     = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet    = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const borrowersData = jsonData
          .filter((row) => row[COL.loanNumber] && row[COL.loanNumber] !== "")
          .map((row, index) => ({
            id:                    Date.now() + index,
            loanNumber:            String(row[COL.loanNumber]            || ""),
            borrowerName:          String(row[COL.borrowerName]          || ""),
            borrowerNIC:           String(row[COL.borrowerNIC]           || ""),
            membershipNo:          String(row[COL.membershipNo]          || ""),
            registrationDate:      parseExcelDate(row[COL.registrationDate]),
            loanType:              String(row[COL.loanType]              || ""),
            borrowerAddress:       String(row[COL.borrowerAddress]       || ""),
            guarantor1Name:        String(row[COL.guarantor1Name]        || ""),
            guarantor1NIC:         String(row[COL.guarantor1NIC]         || ""),
            guarantor1MembershipNo:String(row[COL.guarantor1MembershipNo]|| ""),
            guarantor1Address:     String(row[COL.guarantor1Address]     || ""),
            guarantor2Name:        String(row[COL.guarantor2Name]        || ""),
            guarantor2NIC:         String(row[COL.guarantor2NIC]         || ""),
            guarantor2MembershipNo:String(row[COL.guarantor2MembershipNo]|| ""),
            guarantor2Address:     String(row[COL.guarantor2Address]     || ""),
            loanAmount:            String(row[COL.loanAmount]            || ""),
            outstandingLoanAmount: String(row[COL.outstandingLoanAmount] || ""),
            interest:              String(row[COL.interest]              || ""),
            interestFromDate:      parseExcelDate(row[COL.interestFromDate]), // ⭐ NEW
            interestToDate:        parseExcelDate(row[COL.interestToDate]),   // ⭐ NEW
            interestRate:          String(row[COL.interestRate]          || ""),
            stationeryFees:        String(row[COL.stationeryFees]        || ""),
          }));

        if (!borrowersData.length) {
          setError("Excel ගොනුවේ වලංගු දත්ත හමු නොවීය");
          return;
        }
        setBorrowers((prev) => [...prev, ...borrowersData]);
        setSuccess(`${borrowersData.length} ණයගැතියන් සාර්ථකව එකතු කරන ලදී!`);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Excel ගොනුව සැකසීමේ දෝෂයක් සිදු විය");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop      = (e) => { e.preventDefault(); setIsDragging(false); const f = e.dataTransfer.files[0]; if (f?.name?.endsWith(".xlsx")) parseExcelFile(f); else setError("කරුණාකර වලංගු Excel ගොනුවක් (.xlsx) උඩුගත කරන්න"); };
  const handleFileInput = (e) => { if (e.target.files[0]) parseExcelFile(e.target.files[0]); e.target.value = ""; };
  const handleDragOver  = (e) => { e.preventDefault(); setIsDragging(true);  };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };

  const resetForm = () => {
    setCurrentBorrower({ ...EMPTY_BORROWER });
    setEditingBorrower(null);
    setShowAddForm(false);
  };

  const handleAddBorrower = () => {
    if (!currentBorrower.loanNumber || !currentBorrower.borrowerName) {
      alert("කරුණාකර අවම වශයෙන් ණය අංකය සහ නම පුරවන්න");
      return;
    }
    if (!currentBorrower.registrationDate) {
      alert("කරුණාකර ලියාපදිංචි වූ දිනය තෝරන්න");
      return;
    }
    // Validate interest period dates if both provided
    if (currentBorrower.interestFromDate && currentBorrower.interestToDate) {
      if (calcDays(currentBorrower.interestFromDate, currentBorrower.interestToDate) < 0) {
        alert("පොළිය අවසාන දිනය ආරම්භ දිනයට පෙර විය නොහැක");
        return;
      }
    }

    if (editingBorrower !== null) {
      const updated = [...borrowers];
      updated[editingBorrower] = { ...currentBorrower, id: Date.now() };
      setBorrowers(updated);
    } else {
      setBorrowers([...borrowers, { ...currentBorrower, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEditBorrower   = (i) => { setCurrentBorrower(borrowers[i]); setEditingBorrower(i); setShowAddForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const handleDeleteBorrower = (i) => { if (window.confirm("මෙම ණයගැතියා ඉවත් කරන්නද?")) setBorrowers(borrowers.filter((_, j) => j !== i)); };

  const handleSubmit = async () => {
    if (!borrowers.length) { setError("කරුණාකර අවම වශයෙන් එක් ණයගැතියෙකු එක් කරන්න"); return; }
    setError(""); setSuccess(""); setLoading(true);
    try {
      const districtId = user.districtId || user.district;
      const societyId  = user.societyId  || user.society;
      if (!districtId || !societyId) throw new Error("User missing districtId or societyId. Please log out and log back in.");

      await api.createSubmission({
        districtId, societyId,
        borrowers: borrowers.map(({ id, ...b }) => ({
          ...b,
          loanAmount:            parseFloat(b.loanAmount)            || 0,
          outstandingLoanAmount: parseFloat(b.outstandingLoanAmount) || 0,
          interest:              parseFloat(b.interest)              || 0,
          interestFromDate:      b.interestFromDate || null,   // ⭐ NEW
          interestToDate:        b.interestToDate   || null,   // ⭐ NEW
          interestRate:          parseFloat(b.interestRate)          || 0,
          stationeryFees:        parseFloat(b.stationeryFees)        || 0,
        })),
      });

      setSuccess("ඉදිරිපත් කිරීම සාර්ථකව සාදන ලදී!");
      setBorrowers([]);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setError(err.message || "An error occurred while creating the submission");
    } finally {
      setLoading(false);
    }
  };

  const field = (key) => (e) => setCurrentBorrower((p) => ({ ...p, [key]: e.target.value }));

  const calculateTotal = (b) =>
    (parseFloat(b.outstandingLoanAmount) || 0) +
    (parseFloat(b.interest)              || 0) +
    (parseFloat(b.stationeryFees)        || 0);

  const getTotalLoan  = () => borrowers.reduce((s, b) => s + (parseFloat(b.loanAmount)            || 0), 0);
  const getTotalOut   = () => borrowers.reduce((s, b) => s + (parseFloat(b.outstandingLoanAmount) || 0), 0);
  const getTotalInt   = () => borrowers.reduce((s, b) => s + (parseFloat(b.interest)              || 0), 0);
  const getTotalFees  = () => borrowers.reduce((s, b) => s + (parseFloat(b.stationeryFees)        || 0), 0);
  const getGrandTotal = () => getTotalOut() + getTotalInt() + getTotalFees();

  // days badge for a borrower row in the table
  const InterestPeriodBadge = ({ b }) => {
    if (!b.interestFromDate && !b.interestToDate) return <span className="text-muted" style={{ fontSize: "12px" }}>-</span>;
    const days = calcDays(b.interestFromDate, b.interestToDate);
    return (
      <div style={{ fontSize: "11px", lineHeight: "1.4" }}>
        <div className="text-muted">
          {b.interestFromDate ? new Date(b.interestFromDate).toLocaleDateString("si-LK") : "?"} →{" "}
          {b.interestToDate   ? new Date(b.interestToDate).toLocaleDateString("si-LK")   : "?"}
        </div>
        {days !== null && days >= 0 && (
          <span className="days-badge ok">{days} දින</span>
        )}
      </div>
    );
  };

  // ── Interest period days live counter in form
  const formDays = calcDays(currentBorrower.interestFromDate, currentBorrower.interestToDate);

  return (
    <div className="min-vh-100 p-4">
      <style>{purpleOverrides}</style>

      <div className="container-fluid" style={{ maxWidth: "1400px" }}>

        {/* Page Title */}
        <div className="mb-4">
          <h2 className="fw-bold text-dark" style={{ fontSize: "2rem" }}>
            තීරකකරණය සදහා ණය ගොනු ඉදිරිපත් කිරීම
          </h2>
          <p className="text-muted" style={{ fontSize: "1.1rem" }}>
            තීරකකරණය සදහා ඉදිරිපත් කළ යුතු ණයගැතියන්ගේ තොරතුරු
          </p>
        </div>

        {/* Stat Cards */}
        {borrowers.length > 0 && (
          <div className="row g-3 mb-4">
            {[
              { cls: "cs-stat-1", icon: <Users size={28} />,      label: "එකතු කළ ණයගැතියන්", val: borrowers.length,                               big: true },
              { cls: "cs-stat-2", icon: <DollarSign size={28} />, label: "මුළු ණය",             val: `රු. ${getTotalLoan().toLocaleString("si-LK")}` },
              { cls: "cs-stat-3", icon: <DollarSign size={28} />, label: "මුළු බාකි ණය",        val: `රු. ${getTotalOut().toLocaleString("si-LK")}`  },
              { cls: "cs-stat-4", icon: <DollarSign size={28} />, label: "මුළු පොළිය",          val: `රු. ${getTotalInt().toLocaleString("si-LK")}`  },
              { cls: "cs-stat-5", icon: <DollarSign size={28} />, label: "මුළු වටිනාකම",        val: `රු. ${getGrandTotal().toLocaleString("si-LK")}`},
            ].map((s, i) => (
              <div key={i} className="col-lg col-md-4 col-sm-6">
                <div className={`card text-white shadow ${s.cls}`}>
                  <div className="card-body">
                    <div className="opacity-75 mb-2">{s.icon}</div>
                    <p className="small mb-1 opacity-75">{s.label}</p>
                    {s.big ? <h3 className="mb-0">{s.val}</h3> : <h5 className="mb-0">{s.val}</h5>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Info Alert */}
        <div className="alert alert-info border-start border-1 border-info mb-4">
          <div className="d-flex align-items-start">
            <AlertCircle size={20} className="me-3 flex-shrink-0 mt-1" />
            <div>ණයගැතියන් පිළිබඳ තොරතුරු එකතු කර සමිති අනුමත කිරීමේ නිලධාරියා වෙත යවනු ලැබේ.</div>
          </div>
        </div>

        {error   && <div className="alert alert-danger  border-start border-4 border-danger" ><div className="d-flex align-items-start"><XCircle     size={24} className="me-3 flex-shrink-0" /><div>{error}</div></div></div>}
        {success && <div className="alert alert-success border-start border-4 border-success"><div className="d-flex align-items-start"><CheckCircle size={24} className="me-3 flex-shrink-0" /><div>{success}</div></div></div>}

        {/* ── Add / Edit Form ─────────────────────────────────── */}
        {showAddForm && (
          <div className="card shadow-lg mb-4">
            <div className="card-header bg-white border-bottom">
              <h2 className="h4 mb-0">
                {editingBorrower !== null ? "🖊️ ණයගැතියා සංස්කරණය කරන්න" : "➕ නව ණයගැතියෙකු එකතු කරන්න"}
              </h2>
            </div>
            <div className="card-body">

              {/* Basic Info */}
              <div className="mb-4">
                <h5 className="d-flex align-items-center mb-3">
                  <Home className="text-primary me-2" size={20} />
                  මූලික තොරතුරු
                </h5>
                <div className="row g-3">
                  {[
                    ["ණය අංකය",              "loanNumber",       "text", "ණය අංකය"],
                    ["ණයගැතියාගේ නම",        "borrowerName",     "text", "සම්පූර්ණ නම"],
                    ["ජාතික හැදුනුම්පත් (NIC)","borrowerNIC",    "text", "NIC"],
                    ["සාමාජික අංකය",          "membershipNo",    "text", "සාමාජික අංකය"],
                    ["ණය ලබාගත් දිනය",        "registrationDate","date", ""],
                    ["ණයගැතියාගේ ලිපිනය",    "borrowerAddress", "text", "ලිපිනය"],
                  ].map(([label, key, type, ph]) => (
                    <div key={key} className="col-md-3">
                      <label className="form-label fw-semibold">
                        {label} <span className="text-danger">*</span>
                      </label>
                      <input
                        type={type}
                        className="form-control"
                        value={currentBorrower[key]}
                        onChange={field(key)}
                        placeholder={ph}
                        required
                      />
                    </div>
                  ))}
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">
                      ආරවුලේ ස්වභාවය <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={currentBorrower.loanType}
                      onChange={field("loanType")}
                      required
                    >
                      <option value="">ආරවුලේ ස්වභාවය තෝරන්න</option>
                      {loanTypes.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Guarantor 1 */}
              <div className="mb-4 p-3 rounded"
                style={{ background: "rgba(109,40,217,0.06)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <h5 className="d-flex align-items-center mb-3" style={{ color: "#6d28d9" }}>
                  <UserCheck size={20} className="me-2" style={{ color: "#7c3aed" }} />
                  පළමු ඇපකරු විස්තර
                </h5>
                <div className="row g-3">
                  {[
                    ["නම",          "guarantor1Name"],
                    ["NIC",         "guarantor1NIC"],
                    ["සාමාජික අංකය","guarantor1MembershipNo"],
                    ["ලිපිනය",      "guarantor1Address"],
                  ].map(([l, k]) => (
                    <div key={k} className="col-md-3">
                      <label className="form-label fw-semibold">
                        {l} <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentBorrower[k]}
                        onChange={field(k)}
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Guarantor 2 */}
              <div className="mb-4 p-3 rounded"
                style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(167,139,250,0.25)" }}>
                <h5 className="d-flex align-items-center mb-3" style={{ color: "#7c3aed" }}>
                  <UserCheck size={20} className="me-2" style={{ color: "#8b5cf6" }} />
                  දෙවන ඇපකරු විස්තර
                </h5>
                <div className="row g-3">
                  {[
                    ["නම",          "guarantor2Name"],
                    ["NIC",         "guarantor2NIC"],
                    ["සාමාජික අංකය","guarantor2MembershipNo"],
                    ["ලිපිනය",      "guarantor2Address"],
                  ].map(([l, k]) => (
                    <div key={k} className="col-md-3">
                      <label className="form-label fw-semibold">
                        {l}
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={currentBorrower[k]}
                        onChange={field(k)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Info */}
              <div className="mb-4 p-3 rounded"
                style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.18)" }}>
                <h5 className="d-flex align-items-center mb-3">
                  <DollarSign className="text-primary me-2" size={20} />
                  මුල්‍ය තොරතුරු
                </h5>
                <div className="row g-3">

                  {/* Loan Amount */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold">
                      ණය මුදල (රු.) <span className="text-danger">*</span>
                    </label>
                    <input type="number" step="0.01" className="form-control"
                      value={currentBorrower.loanAmount} onChange={field("loanAmount")} placeholder="0.00" required />
                  </div>

                  {/* Outstanding Loan */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold">
                      හිඟ ණය ශේෂය (රු.) <span className="text-danger">*</span>
                    </label>
                    <input type="number" step="0.01" className="form-control"
                      value={currentBorrower.outstandingLoanAmount} onChange={field("outstandingLoanAmount")} placeholder="0.00" required />
                  </div>

                  {/* Interest Rate */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold">
                      පොළි අනුපාතය (%) <span className="text-danger">*</span>
                    </label>
                    <input type="number" step="0.01" className="form-control"
                      value={currentBorrower.interestRate} onChange={field("interestRate")} placeholder="0.00" required />
                  </div>

                  {/* Stationery Fees */}
                  <div className="col-md-2">
                    <label className="form-label fw-semibold">
                      ලිපිද්‍රව්‍ය හා නඩු ගාස්තු (රු.)
                    </label>
                    <input type="number" step="0.01" className="form-control"
                      value={currentBorrower.stationeryFees} onChange={field("stationeryFees")} placeholder="0.00" />
                  </div>

                  {/* Grand Total chip */}
                  <div className="col-md-2 d-flex align-items-end">
                    <div className="alert alert-info w-100 mb-0">
                      <small className="fw-semibold">මුළු වටිනාකම:</small>
                      <div className="h5 mb-0">
                        රු. {calculateTotal(currentBorrower).toLocaleString("si-LK")}
                      </div>
                    </div>
                  </div>

                  {/* ⭐ Interest Amount + Period — full row, green box */}
                  <div className="col-12">
                    <div className="interest-period-box">
                      <div className="period-label">
                        <Calendar size={14} />
                        හිඟ ණය පොළිය සහ කාල සීමාව
                      </div>
                      <div className="row g-3 align-items-end">

                        {/* Interest Amount */}
                        <div className="col-md-3">
                          <label className="form-label fw-semibold" style={{ fontSize: "13px" }}>
                            හිඟ ණය පොළිය (රු.) <span className="text-danger">*</span>
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            className="form-control"
                            value={currentBorrower.interest}
                            onChange={field("interest")}
                            placeholder="0.00"
                            required
                          />
                        </div>

                        {/* From Date */}
                        <div className="col-md-3">
                          <label className="form-label fw-semibold" style={{ fontSize: "13px" }}>
                            <Calendar size={13} className="me-1" />
                            පොළිය ආරම්භ දිනය
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={currentBorrower.interestFromDate}
                            onChange={field("interestFromDate")}
                          />
                        </div>

                        {/* To Date */}
                        <div className="col-md-3">
                          <label className="form-label fw-semibold" style={{ fontSize: "13px" }}>
                            <Calendar size={13} className="me-1" />
                            පොළිය අවසාන දිනය
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={currentBorrower.interestToDate}
                            min={currentBorrower.interestFromDate || undefined}
                            onChange={field("interestToDate")}
                          />
                        </div>

                        {/* Live days badge */}
                        <div className="col-md-3 d-flex align-items-end pb-1">
                          {formDays !== null && formDays >= 0 && (
                            <span className="days-badge ok" style={{ fontSize: "14px", padding: "8px 14px" }}>
                              ✓ &nbsp;{formDays} දින
                            </span>
                          )}
                          {formDays !== null && formDays < 0 && (
                            <span className="days-badge err" style={{ fontSize: "13px", padding: "8px 14px" }}>
                              ⚠ &nbsp;දිනය වැරදිය
                            </span>
                          )}
                          {formDays === null &&
                            (currentBorrower.interestFromDate || currentBorrower.interestToDate) && (
                            <span className="text-muted" style={{ fontSize: "12px" }}>
                              දෙකම ඇතුළු කරන්න
                            </span>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                  {/* end interest period box */}

                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button onClick={resetForm} className="btn btn-secondary">
                  අවලංගු කරන්න
                </button>
                <button onClick={handleAddBorrower} className="btn btn-primary">
                  {editingBorrower !== null
                    ? <><Edit size={18} className="me-2" />යාවත්කාලීන කරන්න</>
                    : <><Plus size={18} className="me-2" />එකතු කරන්න</>}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add CTA */}
        {!showAddForm && (
          <div className="mb-4">
            <button onClick={() => setShowAddForm(true)} className="btn btn-primary btn-lg w-100 shadow-lg">
              <Plus size={24} className="me-2" />
              නව ණයගැතියෙකු එකතු කරන්න
            </button>
          </div>
        )}

        {/* Borrowers Table */}
        {borrowers.length > 0 && (
          <div className="card shadow-lg mb-4">
            <div className="card-header bg-white border-bottom">
              <h2 className="h4 mb-0">එකතු කළ ණයගැතියන් ({borrowers.length})</h2>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>ණය අංකය</th>
                      <th>නම</th>
                      <th>NIC</th>
                      <th className="text-end">ණය මුදල</th>
                      {/* ⭐ NEW column */}
                      <th>පොළිය කාල සීමාව</th>
                      <th className="text-end">මුළු වටිනාකම</th>
                      <th className="text-center">ක්‍රියා</th>
                    </tr>
                  </thead>
                  <tbody>
                    {borrowers.map((b, i) => (
                      <tr key={b.id}>
                        <td>{i + 1}</td>
                        <td className="fw-semibold">{b.loanNumber}</td>
                        <td>{b.borrowerName}</td>
                        <td className="text-muted">{b.borrowerNIC}</td>
                        <td className="text-end">
                          රු. {parseFloat(b.loanAmount || 0).toLocaleString("si-LK")}
                        </td>
                        {/* ⭐ NEW cell */}
                        <td><InterestPeriodBadge b={b} /></td>
                        <td className="text-end fw-bold text-primary">
                          රු. {calculateTotal(b).toLocaleString("si-LK")}
                        </td>
                        <td className="text-center">
                          <div className="btn-group btn-group-sm">
                            <button onClick={() => handleEditBorrower(i)} className="btn btn-outline-primary" title="සංස්කරණය"><Edit   size={16} /></button>
                            <button onClick={() => handleDeleteBorrower(i)} className="btn btn-outline-danger"  title="ඉවත්"      ><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Excel Section */}
        <div className="card shadow-lg mb-4 border-success border-2">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <div className="bg-success text-white p-3 rounded me-3"><FileText size={20} /></div>
              <div>
                <h5 className="h4 mb-1">Excel භාවිතයෙන් ණයගැතියන් පිළිබඳ තොරතුරු එකතු කර ඉදිරිපත් කිරීම</h5>
                <p className="text-muted mb-0 small">Template බාගත කර එය සම්පූර්ණ කර උඩුගත කරන්න</p>
              </div>
            </div>

            <div className="row g-3">
              {/* Download */}
              <div className="col-md-6">
                <div className="card h-100 border-success border-2">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-success bg-opacity-10 p-2 rounded me-2">
                        <Download className="text-success" size={24} />
                      </div>
                      <div>
                        <h6 className="card-title mb-0">පියවර 1: Template බාගත කරගන්න</h6>
                        <p className="text-muted small mb-0">
                          Excel ගොනුව බාගත කර විවෘත කරන්න
                          
                        
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={downloadExcelTemplate}
                      className="btn btn-success w-100 d-flex align-items-center justify-content-center"
                    >
                      <Download size={20} className="me-2" />
                      Template බාගත කරගන්න
                    </button>
                  </div>
                </div>
              </div>

              {/* Upload */}
              <div className="col-md-6">
                <div className="card h-100 border-primary border-2">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="bg-primary bg-opacity-10 p-2 rounded me-2">
                        <Upload className="text-primary" size={24} />
                      </div>
                      <div>
                        <h6 className="card-title mb-0">පියවර 2: ගොනුව උඩුගත කරන්න</h6>
                        <p className="text-muted small mb-0">සම්පූර්ණ කළ Excel ගොනුව තෝරන්න</p>
                      </div>
                    </div>
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      className={`border border-2 rounded p-4 text-center ${
                        isDragging
                          ? "border-primary bg-primary bg-opacity-10"
                          : "border-primary border-opacity-50 bg-light"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      <Upload className={isDragging ? "text-primary" : "text-primary text-opacity-75"} size={32} />
                      <p className="small fw-semibold mb-2 mt-2">ගොනුව මෙහි දමන්න හෝ</p>
                      <label className="btn btn-primary btn-sm mb-0">
                        ගොනුවක් තෝරන්න
                        <input type="file" accept=".xlsx" onChange={handleFileInput} className="d-none" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert border-start border-2 border-warning mt-3 mb-0">
              <div className="d-flex align-items-start">
                <AlertCircle size={18} className="me-2 flex-shrink-0 mt-1" />
                <small>
                  <strong>ඉඟිය:</strong> Excel ගොනුවේ දත්ත නිවැරදිව පුරවා ඇති බවට වග බලා ගන්න.
                  <strong> "පොළිය ආරම්භ දිනය"</strong> සහ <strong>"පොළිය අවසාන දිනය"</strong> තීරු
                  ඔබට අවශ්‍ය නම් පමණක් පිරවිය හැකිය (අනිවාර්ය නොවේ).
                  දිනය ආකෘතිය: <strong>mm/dd/yyyy</strong>
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        {borrowers.length > 0 && (
          <div className="card shadow-lg">
            <div className="card-body">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`btn btn-lg w-100 ${loading ? "btn-secondary" : "btn-success"}`}
              >
                {loading ? (
                  <><span className="spinner-border spinner-border-sm me-2" />ඉදිරිපත් කරමින්...</>
                ) : (
                  `✓ සමිති අනුමත කිරීමේ නිලධාරියා වෙත ඉදිරිපත් කරන්න (ණයගැතියන් ${borrowers.length})`
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CreateSubmissionPage;