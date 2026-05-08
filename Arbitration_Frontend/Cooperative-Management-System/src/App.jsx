///************************* */******************************************************************************************************* */
// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// // Mock Data
// const DISTRICTS = [
//   { id: "nuwara-eliya", name: "Nuwara Eliya", code: "N" },
//   { id: "kandy", name: "Kandy", code: "K" },
//   { id: "matale", name: "Matale", code: "M" },
// ];

// const INITIAL_ARBITRATION_OFFICERS = [
//   {
//     id: "ao1",
//     name: "සුනිල් පෙරේරා",
//     district: "nuwara-eliya",
//     assignedTo: null,
//   },
//   {
//     id: "ao2",
//     name: "කමල් සිල්වා",
//     district: "nuwara-eliya",
//     assignedTo: null,
//   },
//   { id: "ao3", name: "නිමල් ජයවර්ධන", district: "kandy", assignedTo: null },
//   { id: "ao4", name: "රංජිත් ප්‍රනාන්දු", district: "kandy", assignedTo: null },
//   { id: "ao5", name: "අශෝක බණ්ඩාර", district: "matale", assignedTo: null },
// ];

// const INITIAL_SOCIETIES = {
//   "nuwara-eliya": [
//     { id: "ne-s1", name: "ශ්‍රී ලංකා සමෘද්ධි සමිතිය - නුවරඑළිය" },
//     { id: "ne-s2", name: "මධ්‍ය පළාත් සහයෝගී සමිතිය - නුවරඑළිය" },
//   ],
//   kandy: [
//     { id: "k-s1", name: "මහනුවර සමෘද්ධි සමිතිය" },
//     { id: "k-s2", name: "මධ්‍ය පළාත් සංවර්ධන සමිතිය - මහනුවර" },
//   ],
//   matale: [
//     { id: "m-s1", name: "මාතලේ සහයෝගී සමිතිය" },
//     { id: "m-s2", name: "මධ්‍ය පළාත් ප්‍රජා සමිතිය - මාතලේ" },
//   ],
// };

// const App = () => {
//   const [userRole, setUserRole] = useState("society");
//   const [selectedDistrict, setSelectedDistrict] = useState("");
//   const [selectedSociety, setSelectedSociety] = useState("");
//   const [districtOfficeDistrict, setDistrictOfficeDistrict] = useState("");

//   const [arbitrationOfficers, setArbitrationOfficers] = useState(
//     INITIAL_ARBITRATION_OFFICERS
//   );
//   const [societies, setSocieties] = useState(INITIAL_SOCIETIES);

//   const [borrowers, setBorrowers] = useState([]);
//   const [currentBorrower, setCurrentBorrower] = useState({
//     registrationNo: "",
//     registeredAddress: "",
//     registrationDate: "",
//     loanNumber: "",
//     borrowerName: "",
//     borrowerAddress: "",
//     membershipNo: "",
//     guarantor1Name: "",
//     guarantor1Address: "",
//     guarantor1MembershipNo: "",
//     guarantor2Name: "",
//     guarantor2Address: "",
//     guarantor2MembershipNo: "",
//     loanAmount: "",
//     interest: "",
//     interestRate: "",
//     stationeryFees: "",
//   });

//   const [submissions, setSubmissions] = useState([]);
//   const [pendingApprovals, setPendingApprovals] = useState([]);
//   const [viewMode, setViewMode] = useState("form");
//   const [expandedBorrower, setExpandedBorrower] = useState(null);
//   const [districtTab, setDistrictTab] = useState("submissions");

//   const [newOfficer, setNewOfficer] = useState({ name: "", district: "" });
//   const [newSociety, setNewSociety] = useState({ name: "", district: "" });

//   // Modal states
//   const [showDecisionModal, setShowDecisionModal] = useState(false);
//   const [showAlertModal, setShowAlertModal] = useState(false);
//   const [alertMessage, setAlertMessage] = useState({
//     title: "",
//     message: "",
//     type: "info",
//   });
//   const [showDecisionDetailsModal, setShowDecisionDetailsModal] =
//     useState(false);
//   const [viewDecisionDetails, setViewDecisionDetails] = useState(null);

//   const [currentDecision, setCurrentDecision] = useState({
//     submissionId: null,
//     borrowerId: null,
//     decisionDate: "",
//     finalLoanAmount: "",
//     interestDeducted: "",
//     arbitrationDecision: "",
//   });

//   // Custom Alert Modal
//   const showAlert = (title, message, type = "info") => {
//     setAlertMessage({ title, message, type });
//     setShowAlertModal(true);
//   };

//   const openDecisionModal = (submissionId, borrowerId) => {
//     setCurrentDecision({
//       submissionId,
//       borrowerId,
//       decisionDate: "",
//       finalLoanAmount: "",
//       interestDeducted: "",
//       arbitrationDecision: "",
//     });
//     setShowDecisionModal(true);
//   };

//   const closeDecisionModal = () => {
//     setShowDecisionModal(false);
//     setCurrentDecision({
//       submissionId: null,
//       borrowerId: null,
//       decisionDate: "",
//       finalLoanAmount: "",
//       interestDeducted: "",
//       arbitrationDecision: "",
//     });
//   };

//   const openDecisionDetailsModal = (borrower) => {
//     setViewDecisionDetails(borrower);
//     setShowDecisionDetailsModal(true);
//   };

//   const closeDecisionDetailsModal = () => {
//     setShowDecisionDetailsModal(false);
//     setViewDecisionDetails(null);
//   };

//   const submitDecision = () => {
//     if (
//       !currentDecision.decisionDate ||
//       !currentDecision.finalLoanAmount ||
//       !currentDecision.interestDeducted ||
//       !currentDecision.arbitrationDecision
//     ) {
//       showAlert("දෝෂයකි!", "කරුණාකර සියලු තොරතුරු පුරවන්න", "warning");
//       return;
//     }

//     addArbitrationDecision(
//       currentDecision.submissionId,
//       currentDecision.borrowerId,
//       {
//         decisionDate: currentDecision.decisionDate,
//         finalLoanAmount: currentDecision.finalLoanAmount,
//         interestDeducted: currentDecision.interestDeducted,
//         arbitrationDecision: currentDecision.arbitrationDecision,
//       }
//     );

//     closeDecisionModal();
//     showAlert("සාර්ථකයි!", "තීරණය සාර්ථකව එකතු කරන ලදී!", "success");
//   };

//   const addBorrower = () => {
//     if (!currentBorrower.borrowerName || !currentBorrower.loanNumber) {
//       showAlert("දෝෂයකි!", "කරුණාකර අවශ්‍ය තොරතුරු පුරවන්න", "warning");
//       return;
//     }

//     setBorrowers([...borrowers, { ...currentBorrower, id: Date.now() }]);
//     setCurrentBorrower({
//       registrationNo: "",
//       registeredAddress: "",
//       registrationDate: "",
//       loanNumber: "",
//       borrowerName: "",
//       borrowerAddress: "",
//       membershipNo: "",
//       guarantor1Name: "",
//       guarantor1Address: "",
//       guarantor1MembershipNo: "",
//       guarantor2Name: "",
//       guarantor2Address: "",
//       guarantor2MembershipNo: "",
//       loanAmount: "",
//       interest: "",
//       interestRate: "",
//       stationeryFees: "",
//     });
//     showAlert("සාර්ථකයි!", "ණයගැතියා සාර්ථකව එකතු කරන ලදී!", "success");
//   };

//   const removeBorrower = (id) => {
//     setBorrowers(borrowers.filter((b) => b.id !== id));
//   };

//   const submitForApproval = () => {
//     if (borrowers.length === 0) {
//       showAlert(
//         "දෝෂයකි!",
//         "කරුණාකර අවම වශයෙන් එක් ණයගැතියෙක් එක් කරන්න",
//         "warning"
//       );
//       return;
//     }

//     const pendingSubmission = {
//       id: Date.now(),
//       district: selectedDistrict,
//       society: selectedSociety,
//       borrowers: [...borrowers],
//       submittedDate: new Date().toISOString(),
//       status: "pending-approval",
//     };

//     setPendingApprovals([...pendingApprovals, pendingSubmission]);
//     setBorrowers([]);
//     showAlert(
//       "සාර්ථකයි!",
//       "අනුමැතිය සඳහා සාර්ථකව ඉදිරිපත් කරන ලදී!",
//       "success"
//     );
//     setViewMode("pending");
//   };

//   const approveSubmission = (pendingId) => {
//     const pending = pendingApprovals.find((p) => p.id === pendingId);
//     if (!pending) return;

//     const approvedSubmission = {
//       ...pending,
//       borrowers: pending.borrowers.map((b) => ({
//         ...b,
//         arbitrationFeePaid: false,
//         arbitrationNumber: null,
//         assignedOfficer: null,
//         status: "pending",
//       })),
//       status: "approved",
//       approvedDate: new Date().toISOString(),
//     };

//     setSubmissions([...submissions, approvedSubmission]);
//     setPendingApprovals(pendingApprovals.filter((p) => p.id !== pendingId));
//     showAlert(
//       "සාර්ථකයි!",
//       "ජිල්ලා කාර්යාලයට සාර්ථකව ඉදිරිපත් කරන ලදී!",
//       "success"
//     );
//   };

//   const rejectSubmission = (pendingId) => {
//     setPendingApprovals(pendingApprovals.filter((p) => p.id !== pendingId));
//     showAlert(
//       "ප්‍රතික්ෂේප කරන ලදී",
//       "ඉදිරිපත් කිරීම ප්‍රතික්ෂේප කරන ලදී",
//       "warning"
//     );
//   };

//   const updateArbitrationFee = (submissionId, borrowerId, isPaid) => {
//     setSubmissions(
//       submissions.map((sub) => {
//         if (sub.id === submissionId) {
//           return {
//             ...sub,
//             borrowers: sub.borrowers.map((b) => {
//               if (b.id === borrowerId && isPaid) {
//                 const district = DISTRICTS.find((d) => d.id === sub.district);
//                 const existingNumbers = submissions
//                   .flatMap((s) => s.borrowers)
//                   .filter(
//                     (b) =>
//                       b.arbitrationNumber &&
//                       b.arbitrationNumber.includes(district.code)
//                   )
//                   .map((b) => {
//                     const match = b.arbitrationNumber.match(/(\d+)$/);
//                     return match ? parseInt(match[1]) : 0;
//                   });
//                 const nextNumber =
//                   existingNumbers.length > 0
//                     ? Math.max(...existingNumbers) + 1
//                     : 1;
//                 const arbitrationNumber = `CDC/${district.code}/2025/${String(
//                   nextNumber
//                 ).padStart(4, "0")}`;

//                 const availableOfficer = arbitrationOfficers.find(
//                   (ao) => ao.district === sub.district && ao.assignedTo === null
//                 );

//                 if (!availableOfficer) {
//                   showAlert(
//                     "දෝෂයකි!",
//                     "මෙම දිස්ත්‍රික්කයේ ලබා ගත හැකි බේරුම්කරුවන් නොමැත!",
//                     "error"
//                   );
//                   return b;
//                 }

//                 setArbitrationOfficers(
//                   arbitrationOfficers.map((ao) =>
//                     ao.id === availableOfficer.id
//                       ? { ...ao, assignedTo: sub.society }
//                       : ao
//                   )
//                 );

//                 return {
//                   ...b,
//                   arbitrationFeePaid: true,
//                   arbitrationNumber,
//                   assignedOfficer: availableOfficer.name,
//                   assignedOfficerId: availableOfficer.id,
//                   status: "assigned",
//                   arbitrationDecision: null,
//                   decisionDate: null,
//                   finalLoanAmount: null,
//                   interestDeducted: null,
//                 };
//               }
//               return { ...b, arbitrationFeePaid: isPaid };
//             }),
//           };
//         }
//         return sub;
//       })
//     );
//   };

//   const addArbitrationDecision = (submissionId, borrowerId, decision) => {
//     setSubmissions(
//       submissions.map((sub) => {
//         if (sub.id === submissionId) {
//           return {
//             ...sub,
//             borrowers: sub.borrowers.map((b) => {
//               if (b.id === borrowerId) {
//                 return {
//                   ...b,
//                   ...decision,
//                   status: "decision-given",
//                 };
//               }
//               return b;
//             }),
//           };
//         }
//         return sub;
//       })
//     );
//   };

//   const addArbitrationOfficer = () => {
//     if (!newOfficer.name || !newOfficer.district) {
//       showAlert("දෝෂයකි!", "කරුණාකර සියලු තොරතුරු පුරවන්න", "warning");
//       return;
//     }
//     const officer = {
//       id: "ao-" + Date.now(),
//       name: newOfficer.name,
//       district: newOfficer.district,
//       assignedTo: null,
//     };
//     setArbitrationOfficers([...arbitrationOfficers, officer]);
//     setNewOfficer({ name: "", district: "" });
//     showAlert("සාර්ථකයි!", "බේරුම්කරු සාර්ථකව එකතු කරන ලදී!", "success");
//   };

//   const addNewSociety = () => {
//     if (!newSociety.name || !newSociety.district) {
//       showAlert("දෝෂයකි!", "කරුණාකර සියලු තොරතුරු පුරවන්න", "warning");
//       return;
//     }
//     const society = {
//       id: newSociety.district.substring(0, 1) + "-s-" + Date.now(),
//       name: newSociety.name,
//     };
//     setSocieties({
//       ...societies,
//       [newSociety.district]: [...societies[newSociety.district], society],
//     });
//     setNewSociety({ name: "", district: "" });
//     showAlert("සාර්ථකයි!", "සමිතිය සාර්ථකව එකතු කරන ලදී!", "success");
//   };

//   const generateLetter = (borrower, submission) => {
//     const district = DISTRICTS.find((d) => d.id === submission.district);
//     const society = societies[submission.district].find(
//       (s) => s.id === submission.society
//     );

//     const currentDate = new Date().toLocaleDateString("si-LK");

//     const totalAmount =
//       parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

//     const letterHTML = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
//     <style>
//         @page {
//             size: A4;
//             margin: 2cm;
//         }
//         body {
//             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
//             font-size: 11pt;
//             line-height: 1.5;
//             color: #000;
//         }
//         .page-border {
//             border: 2px solid #000;
//             padding: 25px;
//             min-height: 27cm;
//         }
//         .header-logo {
//             text-align: right;
//             font-size: 9pt;
//             font-style: italic;
//             color: #666;
//             margin-bottom: 15px;
//         }
//         .header-title {
//             text-align: center;
//             font-size: 12pt;
//             font-weight: bold;
//             margin-bottom: 20px;
//         }
//         .ref-text {
//             font-size: 10pt;
//             text-align: justify;
//             margin-bottom: 10px;
//             line-height: 1.4;
//         }
//         .main-section {
//             margin-top: 20px;
//         }
//         .to-section {
//             margin: 20px 0;
//         }
//         .content-para {
//             text-align: justify;
//             margin-bottom: 12px;
//             line-height: 1.6;
//         }
//         .details-section {
//             margin: 20px 0 20px 40px;
//             line-height: 2;
//         }
//         .signature-section {
//             margin-top: 60px;
//         }
//         .footer-note {
//             margin-top: 30px;
//             font-size: 9pt;
//             font-style: italic;
//             line-height: 1.4;
//         }
//         .filled-data {
//             font-weight: bold;
//         }
//     </style>
// </head>
// <body>
//     <div class="page-border">
//         <div class="header-logo">
//             තීරක අංකය: <span class="filled-data">${
//               borrower.arbitrationNumber || "..........................."
//             }</span>
//         </div>

//         <div class="header-title">
//             ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
//         </div>

//         <div class="ref-text">
//             1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
//             දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
//             වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව අංක <span class="filled-data">${
//               borrower.registrationNo || "............................."
//             }</span> දරණ ගැසට් පත්‍රයේ
//             ප්‍රකාශිත සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස් <span class="filled-data">${
//               borrower.assignedOfficer
//             }</span>
//         </div>

//         <div class="ref-text">
//             දරණ ගැසට් පත්‍රයේ සඳු කරන ලද නිවේදනයෙන් මා වෙත පවරන ලද නිධන වශයෙන් මධ්‍යම පළාතේ
//             ලියාපදිංචි කරු වශයෙන් ලියාපදිංචි සමුපකාර සමිතියක් වන <span class="filled-data">${
//               society.name
//             }</span> සමිතිය
//             හා විත්තිකරුවන් වශයෙන් ඊ සමිතියේ සාමාජිකයින් වන ණයකරුවෝ <span class="filled-data">${
//               borrower.borrowerName
//             }</span> සහ ඇපකරුවෝ නම්
//             <span class="filled-data">${
//               borrower.guarantor1Name
//             }</span> සහ <span class="filled-data">${
//       borrower.guarantor2Name
//     }</span> ගෙන් සහ ඇපකාර,
//             අතර ණය මුදල වශයෙන්
//         </div>

//         <div class="main-section">
//             <div class="to-section">
//                 රු. <span class="filled-data">${parseFloat(
//                   borrower.loanAmount
//                 ).toLocaleString("si-LK")}</span>
//             </div>

//             <div class="content-para">
//                 සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
//                   borrower.loanNumber
//                 }</span> වන තුරු අවුරුදු ගණන මුළු මුදල
//                 <span class="filled-data">${totalAmount.toLocaleString(
//                   "si-LK"
//                 )}</span> තේපල ප්‍රතිශතයක් <span class="filled-data">${
//       borrower.interestRate
//     }%</span> දී ණය දුන් දිනයෙන් සිට මුළු මුදල ගෙවා නිම කරන්නා වන
//                 තුරු මුල් මුදලට අදුනා ගත යුතු පොළියක්, සමුපකාර සමිතියට අයවිය යුතු වශයෙන් පැන ඇති බවට ආරවුල
//                 නිසා අනු අතිහීමක් යටතේ වූ වෙත ඉදිරිපත් කරන ලදින්, එහි ආරවුල තීරණය කිරීමට තීරණ තාවක්කාරු
//                 දීම සඳහා ආරවුල් බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
//                   borrower.assignedOfficer
//                 }</span>
//                 මහතා / මිය මෙයින් පත් කරමි.
//             </div>

//             <div style="margin-top: 30px;">
//                 <div>මධ්‍ය පළාත් සමුපකාර සංවර්ධන දෙපාර්තුමේන්තුව</div>
//                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්</div>
//                 <div><span class="filled-data">${district.name}</span>,</div>
//             </div>

//             <div style="margin-top: 30px;">
//                 <div>දිනය</div>
//                 <div><span class="filled-data">${currentDate}</span></div>
//             </div>

//             <div class="signature-section">
//                 <div>...........................................................</div>
//                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් /</div>
//                 <div>නියෝජ්‍ය කොමසාරිස්</div>
//             </div>

//             <div class="footer-note">
//                 * ආරවුලේ වන් පාර්ශවයක් ඇපකරුවෙකු නොවන අඩ වගන්තිය තහවුරු කර පිහි සම්පූර්ණ නම් සඳහන් කරන්න.
//             </div>

//             <div class="footer-note">
//                 එහි පැවතරුන්ගේ හෝ විත්තිකාරන්ගේ තත්වය දැක්වන, එනම් ලියාපදිංචි කරන ලද සමිතියක හෝ හිටපු
//                 සාමාජිකයෙකු හෝ හිටපු / මියගිය ) සාමාජිකයෙකු විත්තිකරුවෙකු හෝ හිටපු කාරක සභාව අධිකාරියෙකු /
//                 සේවකයෙකු හෝ මියගිය අධිකාරියෙකු / සේවකයෙකු නීත්‍යානුකූල නියෝජිතයෙකු / උරුමක්කාරයෙකු /
//                 බාල වයස්කාරයෙකු උරුමක්කාරයෙකුගේ භාරකාරයෙකු හෝ යනාදී යම් පාර්ශවයක් ඇපකරුවෙකු වන විට ලියාපදිංචි
//                 ඇපකරුවෙකු යනුවෙන්ද සඳහන් කළ යුතුය.
//             </div>
//         </div>
//     </div>
// </body>
// </html>
//   `;

//     const exportToWord = (html, filename) => {
//       const blob = new Blob(["\ufeff", html], {
//         type: "application/msword",
//       });

//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");
//       link.href = url;
//       link.download =
//         filename || `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(url);
//     };

//     exportToWord(
//       letterHTML,
//       `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`
//     );

//     showAlert(
//       "ලිපිය නිර්මාණය කරන ලදී",
//       "ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ",
//       "success"
//     );
//   };

//   // Alert Modal Component
//   const AlertModal = () => {
//     if (!showAlertModal) return null;

//     const getIconAndColor = () => {
//       switch (alertMessage.type) {
//         case "success":
//           return { icon: "fa-check-circle", color: "#28a745", bg: "#d4edda" };
//         case "error":
//           return { icon: "fa-times-circle", color: "#dc3545", bg: "#f8d7da" };
//         case "warning":
//           return {
//             icon: "fa-exclamation-triangle",
//             color: "#ffc107",
//             bg: "#fff3cd",
//           };
//         default:
//           return { icon: "fa-info-circle", color: "#17a2b8", bg: "#d1ecf1" };
//       }
//     };

//     const style = getIconAndColor();

//     return (
//       <>
//         <div
//           className="modal-backdrop show"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//           onClick={() => setShowAlertModal(false)}
//         ></div>
//         <div
//           className="modal show d-block"
//           style={{ zIndex: 1055 }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div
//               className="modal-content"
//               style={{
//                 border: "none",
//                 borderRadius: "15px",
//                 overflow: "hidden",
//               }}
//             >
//               <div className="modal-body p-0">
//                 <div
//                   className="text-center p-4"
//                   style={{ backgroundColor: style.bg }}
//                 >
//                   <i
//                     className={`fas ${style.icon} fa-3x mb-3`}
//                     style={{ color: style.color }}
//                   ></i>
//                   <h4 className="mb-2" style={{ color: style.color }}>
//                     {alertMessage.title}
//                   </h4>
//                   <p
//                     className="mb-0"
//                     style={{ whiteSpace: "pre-line", color: "#666" }}
//                   >
//                     {alertMessage.message}
//                   </p>
//                 </div>
//               </div>
//               <div
//                 className="modal-footer border-0"
//                 style={{ justifyContent: "center" }}
//               >
//                 <button
//                   type="button"
//                   className="btn btn-lg px-5"
//                   style={{
//                     backgroundColor: style.color,
//                     color: "white",
//                     borderRadius: "10px",
//                     border: "none",
//                   }}
//                   onClick={() => setShowAlertModal(false)}
//                 >
//                   හරි
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   // Decision Modal Component
//   const DecisionModal = () => {
//     if (!showDecisionModal) return null;

//     return (
//       <>
//         <div
//           className="modal-backdrop show"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//           onClick={closeDecisionModal}
//         ></div>
//         <div
//           className="modal show d-block"
//           style={{ zIndex: 1055 }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div
//               className="modal-content shadow-lg"
//               style={{ border: "none", borderRadius: "15px" }}
//             >
//               <div
//                 className="modal-header"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                   color: "white",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <h5 className="modal-title">
//                   <i className="fas fa-gavel me-2"></i>
//                   බේරුම්කරු තීරණය එකතු කරන්න
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   onClick={closeDecisionModal}
//                 ></button>
//               </div>
//               <div className="modal-body p-4">
//                 <div className="row g-4">
//                   <div className="col-md-6">
//                     <label className="form-label fw-bold">
//                       <i className="fas fa-calendar-alt me-2 text-primary"></i>
//                       ණය ලබා දුන් අවසාන දිනය *
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control form-control-lg"
//                       value={currentDecision.decisionDate}
//                       onChange={(e) =>
//                         setCurrentDecision({
//                           ...currentDecision,
//                           decisionDate: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-bold">
//                       <i className="fas fa-money-bill-wave me-2 text-success"></i>
//                       ලැබුණු ණය මුදල (රු.) *
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control form-control-lg"
//                       placeholder="0.00"
//                       value={currentDecision.finalLoanAmount}
//                       onChange={(e) =>
//                         setCurrentDecision({
//                           ...currentDecision,
//                           finalLoanAmount: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     />
//                   </div>

//                   <div className="col-md-6">
//                     <label className="form-label fw-bold">
//                       <i className="fas fa-percent me-2 text-warning"></i>
//                       අඩු කළ පොලිය (රු.) *
//                     </label>
//                     <input
//                       type="number"
//                       className="form-control form-control-lg"
//                       placeholder="0.00"
//                       value={currentDecision.interestDeducted}
//                       onChange={(e) =>
//                         setCurrentDecision({
//                           ...currentDecision,
//                           interestDeducted: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     />
//                   </div>

//                   <div className="col-12">
//                     <label className="form-label fw-bold">
//                       <i className="fas fa-file-alt me-2 text-info"></i>
//                       බේරුම්කරුගේ තීරණය / සටහන් *
//                     </label>
//                     <textarea
//                       className="form-control form-control-lg"
//                       rows="4"
//                       placeholder="තීරණය හෝ සටහන් මෙහි ඇතුළත් කරන්න..."
//                       value={currentDecision.arbitrationDecision}
//                       onChange={(e) =>
//                         setCurrentDecision({
//                           ...currentDecision,
//                           arbitrationDecision: e.target.value,
//                         })
//                       }
//                       style={{ borderRadius: "10px" }}
//                     ></textarea>
//                   </div>
//                 </div>

//                 <div
//                   className="alert alert-info mt-4 mb-0"
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <i className="fas fa-info-circle me-2"></i>
//                   <small>
//                     සියලු තාරකා (*) සලකුණු කළ ක්ෂේත්‍ර පුරවීම අනිවාර්ය වේ
//                   </small>
//                 </div>
//               </div>
//               <div
//                 className="modal-footer"
//                 style={{ borderTop: "2px solid #f0f0f0" }}
//               >
//                 <button
//                   type="button"
//                   className="btn btn-secondary btn-lg px-4"
//                   onClick={closeDecisionModal}
//                   style={{ borderRadius: "10px" }}
//                 >
//                   <i className="fas fa-times me-2"></i>
//                   අවලංගු කරන්න
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-primary btn-lg px-4"
//                   onClick={submitDecision}
//                   style={{
//                     borderRadius: "10px",
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     border: "none",
//                   }}
//                 >
//                   <i className="fas fa-check me-2"></i>
//                   තීරණය සුරකින්න
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   // Decision Details Modal Component
//   const DecisionDetailsModal = () => {
//     if (!showDecisionDetailsModal || !viewDecisionDetails) return null;

//     return (
//       <>
//         <div
//           className="modal-backdrop show"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//           onClick={closeDecisionDetailsModal}
//         ></div>
//         <div
//           className="modal show d-block"
//           style={{ zIndex: 1055 }}
//           tabIndex="-1"
//         >
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div
//               className="modal-content shadow-lg"
//               style={{ border: "none", borderRadius: "15px" }}
//             >
//               <div
//                 className="modal-header"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                   color: "white",
//                   borderRadius: "15px 15px 0 0",
//                 }}
//               >
//                 <h5 className="modal-title">
//                   <i className="fas fa-info-circle me-2"></i>
//                   බේරුම්කරු තීරණයේ සම්පූර්ණ විස්තර
//                 </h5>
//                 <button
//                   type="button"
//                   className="btn-close btn-close-white"
//                   onClick={closeDecisionDetailsModal}
//                 ></button>
//               </div>
//               <div className="modal-body p-4">
//                 <div className="row g-4">
//                   <div className="col-12">
//                     <div className="card border-primary">
//                       <div className="card-header bg-primary text-white">
//                         <h6 className="mb-0">
//                           <i className="fas fa-user me-2"></i>
//                           ණයගැතියාගේ තොරතුරු
//                         </h6>
//                       </div>
//                       <div className="card-body">
//                         <div className="row">
//                           <div className="col-md-6">
//                             <p className="mb-2">
//                               <strong>නම:</strong>{" "}
//                               {viewDecisionDetails.borrowerName}
//                             </p>
//                             <p className="mb-2">
//                               <strong>ණය අංකය:</strong>{" "}
//                               {viewDecisionDetails.loanNumber}
//                             </p>
//                             <p className="mb-0">
//                               <strong>බේරුම් අංකය:</strong>{" "}
//                               <span className="text-primary fw-bold">
//                                 {viewDecisionDetails.arbitrationNumber}
//                               </span>
//                             </p>
//                           </div>
//                           <div className="col-md-6">
//                             <p className="mb-2">
//                               <strong>ලිපිනය:</strong>{" "}
//                               {viewDecisionDetails.borrowerAddress}
//                             </p>
//                             <p className="mb-2">
//                               <strong>බේරුම්කරු:</strong>{" "}
//                               {viewDecisionDetails.assignedOfficer}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-12">
//                     <div className="card border-success">
//                       <div className="card-header bg-success text-white">
//                         <h6 className="mb-0">
//                           <i className="fas fa-money-bill-wave me-2"></i>
//                           මුල් ණය විස්තර
//                         </h6>
//                       </div>
//                       <div className="card-body">
//                         <div className="row">
//                           <div className="col-md-4">
//                             <p className="mb-2">
//                               <strong>ණය මුදල:</strong>
//                               <br />
//                               <span className="text-success fs-5">
//                                 රු.{" "}
//                                 {parseFloat(
//                                   viewDecisionDetails.loanAmount
//                                 ).toLocaleString()}
//                               </span>
//                             </p>
//                           </div>
//                           <div className="col-md-4">
//                             <p className="mb-2">
//                               <strong>පොලිය:</strong>
//                               <br />
//                               <span className="text-warning fs-5">
//                                 රු.{" "}
//                                 {parseFloat(
//                                   viewDecisionDetails.interest
//                                 ).toLocaleString()}
//                               </span>
//                             </p>
//                           </div>
//                           <div className="col-md-4">
//                             <p className="mb-0">
//                               <strong>පොලී අනුපාතය:</strong>
//                               <br />
//                               <span className="text-info fs-5">
//                                 {viewDecisionDetails.interestRate}%
//                               </span>
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-12">
//                     <div className="card border-info">
//                       <div className="card-header bg-info text-white">
//                         <h6 className="mb-0">
//                           <i className="fas fa-gavel me-2"></i>
//                           බේරුම්කරු තීරණය
//                         </h6>
//                       </div>
//                       <div className="card-body">
//                         <div className="row mb-3">
//                           <div className="col-md-4">
//                             <label className="text-muted small">
//                               ණය ලබා දුන් අවසාන දිනය
//                             </label>
//                             <p className="fw-bold">
//                               {viewDecisionDetails.decisionDate
//                                 ? new Date(
//                                     viewDecisionDetails.decisionDate
//                                   ).toLocaleDateString("si-LK")
//                                 : "-"}
//                             </p>
//                           </div>
//                           <div className="col-md-4">
//                             <label className="text-muted small">
//                               ලැබුණු ණය මුදල
//                             </label>
//                             <p className="fw-bold text-success fs-5">
//                               රු.{" "}
//                               {viewDecisionDetails.finalLoanAmount
//                                 ? parseFloat(
//                                     viewDecisionDetails.finalLoanAmount
//                                   ).toLocaleString()
//                                 : "0"}
//                             </p>
//                           </div>
//                           <div className="col-md-4">
//                             <label className="text-muted small">
//                               අඩු කළ පොලිය
//                             </label>
//                             <p className="fw-bold text-danger fs-5">
//                               රු.{" "}
//                               {viewDecisionDetails.interestDeducted
//                                 ? parseFloat(
//                                     viewDecisionDetails.interestDeducted
//                                   ).toLocaleString()
//                                 : "0"}
//                             </p>
//                           </div>
//                         </div>

//                         <div
//                           className="alert alert-light border"
//                           style={{ borderRadius: "10px" }}
//                         >
//                           <label className="text-muted small mb-2">
//                             තීරණය / සටහන්
//                           </label>
//                           <p
//                             className="mb-0"
//                             style={{ whiteSpace: "pre-wrap" }}
//                           >
//                             {viewDecisionDetails.arbitrationDecision || "-"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div
//                 className="modal-footer"
//                 style={{ borderTop: "2px solid #f0f0f0" }}
//               >
//                 <button
//                   type="button"
//                   className="btn btn-primary btn-lg px-5"
//                   onClick={closeDecisionDetailsModal}
//                   style={{
//                     borderRadius: "10px",
//                     background:
//                       "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                     border: "none",
//                   }}
//                 >
//                   <i className="fas fa-times me-2"></i>
//                   වසන්න
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const SocietyDashboard = () => (
//     <div className="container-fluid">
//       <div className="card shadow-lg">
//         <div className="card-body">
//           <h2 className="card-title mb-4">සමිති පාලන පුවරුව</h2>

//           <div className="row mb-4">
//             <div className="col-md-6">
//               <label className="form-label fw-bold">දිස්ත්‍රික්කය තෝරන්න</label>
//               <select
//                 value={selectedDistrict}
//                 onChange={(e) => {
//                   setSelectedDistrict(e.target.value);
//                   setSelectedSociety("");
//                 }}
//                 className="form-select"
//               >
//                 <option value="">තෝරන්න</option>
//                 {DISTRICTS.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="col-md-6">
//               <label className="form-label fw-bold">සමිතිය තෝරන්න</label>
//               <select
//                 value={selectedSociety}
//                 onChange={(e) => setSelectedSociety(e.target.value)}
//                 className="form-select"
//                 disabled={!selectedDistrict}
//               >
//                 <option value="">තෝරන්න</option>
//                 {selectedDistrict &&
//                   societies[selectedDistrict].map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.name}
//                     </option>
//                   ))}
//               </select>
//             </div>
//           </div>

//           <div className="btn-group mb-4" role="group">
//             <button
//               onClick={() => setViewMode("form")}
//               className={`btn ${
//                 viewMode === "form" ? "btn-primary" : "btn-outline-primary"
//               }`}
//             >
//               පෝරමය
//             </button>
//             <button
//               onClick={() => setViewMode("pending")}
//               className={`btn ${
//                 viewMode === "pending" ? "btn-primary" : "btn-outline-primary"
//               }`}
//             >
//               අනුමැතිය සඳහා බලා සිටින (
//               {
//                 pendingApprovals.filter((p) => p.society === selectedSociety)
//                   .length
//               }
//               )
//             </button>
//             <button
//               onClick={() => setViewMode("table")}
//               className={`btn ${
//                 viewMode === "table" ? "btn-primary" : "btn-outline-primary"
//               }`}
//             >
//               අනුමත කළ ඉදිරිපත් කිරීම්
//             </button>
//           </div>

//           {viewMode === "form" && (
//             <>
//               {!selectedDistrict || !selectedSociety ? (
//                 <div className="alert alert-warning">
//                   <i className="fas fa-exclamation-triangle me-2"></i>
//                   කරුණාකර දිස්ත්‍රික්කය සහ සමිතිය තෝරන්න
//                 </div>
//               ) : (
//                 <>
//                   <div className="row g-3 mb-3">
//                     <div className="col-md-4">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="ලියාපදිංචි අංකය"
//                         value={currentBorrower.registrationNo}
//                         onChange={(e) =>
//                           setCurrentBorrower({
//                             ...currentBorrower,
//                             registrationNo: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <input
//                         type="text"
//                         className="form-control"
//                         placeholder="ලියාපදිංචි ලිපිනය"
//                         value={currentBorrower.registeredAddress}
//                         onChange={(e) =>
//                           setCurrentBorrower({
//                             ...currentBorrower,
//                             registeredAddress: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                     <div className="col-md-4">
//                       <input
//                         type="date"
//                         className="form-control"
//                         value={currentBorrower.registrationDate}
//                         onChange={(e) =>
//                           setCurrentBorrower({
//                             ...currentBorrower,
//                             registrationDate: e.target.value,
//                           })
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div className="card bg-light mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">ණයගැතියාගේ තොරතුරු</h5>
//                       <div className="row g-3">
//                         <div className="col-md-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="ණය අංකය *"
//                             value={currentBorrower.loanNumber}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 loanNumber: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="ණයගැතියාගේ නම *"
//                             value={currentBorrower.borrowerName}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 borrowerName: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="ලිපිනය"
//                             value={currentBorrower.borrowerAddress}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 borrowerAddress: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-3">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="සාමාජික අංකය"
//                             value={currentBorrower.membershipNo}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 membershipNo: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card bg-light mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">පළමු ඇපකරු</h5>
//                       <div className="row g-3">
//                         <div className="col-md-4">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="නම"
//                             value={currentBorrower.guarantor1Name}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 guarantor1Name: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-4">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="ලිපිනය"
//                             value={currentBorrower.guarantor1Address}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 guarantor1Address: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-4">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="සාමාජික අංකය"
//                             value={currentBorrower.guarantor1MembershipNo}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 guarantor1MembershipNo: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card bg-light mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">දෙවන ඇපකරු</h5>
//                       <div className="row g-3">
//                         <div className="col-md-4">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="නම"
//                             value={currentBorrower.guarantor2Name}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 guarantor2Name: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-4">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="ලිපිනය"
//                             value={currentBorrower.guarantor2Address}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 guarantor2Address: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-4">
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="සාමාජික අංකය"
//                             value={currentBorrower.guarantor2MembershipNo}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 guarantor2MembershipNo: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="card bg-light mb-3">
//                     <div className="card-body">
//                       <h5 className="card-title">ණය තොරතුරු</h5>
//                       <div className="row g-3">
//                         <div className="col-md-3">
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="ණය මුදල"
//                             value={currentBorrower.loanAmount}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 loanAmount: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-3">
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="පොලිය"
//                             value={currentBorrower.interest}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 interest: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-3">
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="පොලී අනුපාතය %"
//                             value={currentBorrower.interestRate}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 interestRate: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                         <div className="col-md-3">
//                           <input
//                             type="number"
//                             className="form-control"
//                             placeholder="ලිපි ද්‍රව්‍ය ගාස්තු"
//                             value={currentBorrower.stationeryFees}
//                             onChange={(e) =>
//                               setCurrentBorrower({
//                                 ...currentBorrower,
//                                 stationeryFees: e.target.value,
//                               })
//                             }
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={addBorrower}
//                     className="btn btn-success w-100 mb-3"
//                   >
//                     <i className="fas fa-plus me-2"></i>ණයගැතියා එකතු කරන්න
//                   </button>

//                   {borrowers.length > 0 && (
//                     <div>
//                       <h5 className="mb-3">
//                         එකතු කළ ණයගැතියන් ({borrowers.length})
//                       </h5>
//                       <div className="table-responsive">
//                         <table className="table table-bordered table-hover">
//                           <thead className="table-light">
//                             <tr>
//                               <th>ණය අංකය</th>
//                               <th>නම</th>
//                               <th>ලිපිනය</th>
//                               <th>ණය මුදල</th>
//                               <th>ක්‍රියාව</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {borrowers.map((b) => (
//                               <tr key={b.id}>
//                                 <td>{b.loanNumber}</td>
//                                 <td>{b.borrowerName}</td>
//                                 <td>{b.borrowerAddress}</td>
//                                 <td>
//                                   රු.{" "}
//                                   {parseFloat(b.loanAmount).toLocaleString()}
//                                 </td>
//                                 <td>
//                                   <button
//                                     onClick={() => removeBorrower(b.id)}
//                                     className="btn btn-danger btn-sm"
//                                   >
//                                     <i className="fas fa-times"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>

//                       <button
//                         onClick={submitForApproval}
//                         className="btn btn-warning w-100"
//                       >
//                         <i className="fas fa-clock me-2"></i>අනුමැතිය සඳහා
//                         ඉදිරිපත් කරන්න
//                       </button>
//                     </div>
//                   )}
//                 </>
//               )}
//             </>
//           )}

//           {viewMode === "pending" && (
//             <div>
//               <h5 className="mb-3">අනුමැතිය සඳහා බලා සිටින ඉදිරිපත් කිරීම්</h5>
//               {pendingApprovals
//                 .filter((p) => p.society === selectedSociety)
//                 .map((pending) => (
//                   <div key={pending.id} className="card mb-4 border-warning">
//                     <div className="card-header bg-warning text-dark">
//                       <div className="d-flex justify-content-between align-items-center">
//                         <div>
//                           <h6 className="mb-0">
//                             <i className="fas fa-clock me-2"></i>
//                             අනුමැතිය බලා සිටින ඉදිරිපත් කිරීම
//                           </h6>
//                           <small>
//                             ඉදිරිපත් කළ දිනය:{" "}
//                             {new Date(pending.submittedDate).toLocaleDateString(
//                               "si-LK"
//                             )}
//                           </small>
//                         </div>
//                         <div className="btn-group">
//                           <button
//                             onClick={() => approveSubmission(pending.id)}
//                             className="btn btn-success"
//                           >
//                             <i className="fas fa-check me-2"></i>අනුමත කරන්න
//                           </button>
//                           <button
//                             onClick={() => rejectSubmission(pending.id)}
//                             className="btn btn-danger"
//                           >
//                             <i className="fas fa-times me-2"></i>ප්‍රතික්ෂේප
//                             කරන්න
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <table className="table table-bordered table-sm">
//                           <thead className="table-light">
//                             <tr>
//                               <th>ණය අංකය</th>
//                               <th>නම</th>
//                               <th>ලිපිනය</th>
//                               <th>ණය මුදල</th>
//                               <th>පොලිය</th>
//                               <th>විස්තර</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {pending.borrowers.map((b) => (
//                               <React.Fragment key={b.id}>
//                                 <tr>
//                                   <td>{b.loanNumber}</td>
//                                   <td>{b.borrowerName}</td>
//                                   <td>{b.borrowerAddress}</td>
//                                   <td>
//                                     රු.{" "}
//                                     {parseFloat(b.loanAmount).toLocaleString()}
//                                   </td>
//                                   <td>
//                                     රු.{" "}
//                                     {parseFloat(b.interest).toLocaleString()}
//                                   </td>
//                                   <td>
//                                     <button
//                                       onClick={() =>
//                                         setExpandedBorrower(
//                                           expandedBorrower === b.id
//                                             ? null
//                                             : b.id
//                                         )
//                                       }
//                                       className="btn btn-info btn-sm"
//                                     >
//                                       <i className="fas fa-eye"></i> විස්තර
//                                     </button>
//                                   </td>
//                                 </tr>
//                                 {expandedBorrower === b.id && (
//                                   <tr>
//                                     <td colSpan="6" className="bg-light">
//                                       <div className="row g-3 p-3">
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-primary border-bottom pb-2">
//                                                 සම්පූර්ණ තොරතුරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>
//                                                   ලියාපදිංචි අංකය:
//                                                 </strong>{" "}
//                                                 {b.registrationNo}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>
//                                                   ලියාපදිංචි ලිපිනය:
//                                                 </strong>{" "}
//                                                 {b.registeredAddress}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>
//                                                   ලියාපදිංචි දිනය:
//                                                 </strong>{" "}
//                                                 {b.registrationDate}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {b.membershipNo}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-success border-bottom pb-2">
//                                                 ණය විස්තර
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>පොලී අනුපාතය:</strong>{" "}
//                                                 {b.interestRate}%
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>
//                                                   ලිපි ද්‍රව්‍ය ගාස්තු:
//                                                 </strong>{" "}
//                                                 රු.{" "}
//                                                 {parseFloat(
//                                                   b.stationeryFees
//                                                 ).toLocaleString()}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-info border-bottom pb-2">
//                                                 පළමු ඇපකරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>නම:</strong>{" "}
//                                                 {b.guarantor1Name}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ලිපිනය:</strong>{" "}
//                                                 {b.guarantor1Address}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {b.guarantor1MembershipNo}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-info border-bottom pb-2">
//                                                 දෙවන ඇපකරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>නම:</strong>{" "}
//                                                 {b.guarantor2Name}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ලිපිනය:</strong>{" "}
//                                                 {b.guarantor2Address}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {b.guarantor2MembershipNo}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 )}
//                               </React.Fragment>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               {pendingApprovals.filter((p) => p.society === selectedSociety)
//                 .length === 0 && (
//                 <div className="alert alert-info text-center">
//                   <i className="fas fa-info-circle me-2"></i>
//                   අනුමැතිය සඳහා බලා සිටින ඉදිරිපත් කිරීම් නොමැත
//                 </div>
//               )}
//             </div>
//           )}

//           {viewMode === "table" && (
//             <div>
//               <h5 className="mb-3">අනුමත කළ ඉදිරිපත් කිරීම්</h5>
//               {submissions
//                 .filter((s) => s.society === selectedSociety)
//                 .map((submission) => (
//                   <div key={submission.id} className="card mb-4">
//                     <div className="card-body">
//                       <p className="text-muted mb-1">
//                         අනුමත කළ දිනය:{" "}
//                         {submission.approvedDate
//                           ? new Date(
//                               submission.approvedDate
//                             ).toLocaleDateString("si-LK")
//                           : "-"}
//                       </p>
//                       <p className="text-muted">
//                         ඉදිරිපත් කළ දිනය:{" "}
//                         {new Date(submission.submittedDate).toLocaleDateString(
//                           "si-LK"
//                         )}
//                       </p>
//                       <div className="table-responsive">
//                         <table className="table table-bordered table-sm">
//                           <thead className="table-light">
//                             <tr>
//                               <th>ණය අංකය</th>
//                               <th>නම</th>
//                               <th>ණය මුදල</th>
//                               <th>බේරුම් ගාස්තු</th>
//                               <th>බේරුම් අංකය</th>
//                               <th>බේරුම්කරු</th>
//                               <th>තීරණය</th>
//                               <th>තත්වය</th>
//                               <th>විස්තර</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {submission.borrowers.map((b) => (
//                               <React.Fragment key={b.id}>
//                                 <tr>
//                                   <td>{b.loanNumber}</td>
//                                   <td>{b.borrowerName}</td>
//                                   <td>
//                                     රු.{" "}
//                                     {parseFloat(b.loanAmount).toLocaleString()}
//                                   </td>
//                                   <td className="text-center">
//                                     {b.arbitrationFeePaid ? (
//                                       <span className="badge bg-success">
//                                         ගෙවා ඇත
//                                       </span>
//                                     ) : (
//                                       <span className="badge bg-danger">
//                                         නොගෙවා
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td>{b.arbitrationNumber || "-"}</td>
//                                   <td>{b.assignedOfficer || "-"}</td>
//                                   <td className="text-center">
//                                     {b.arbitrationDecision ? (
//                                       <button
//                                         onClick={() =>
//                                           openDecisionDetailsModal(b)
//                                         }
//                                         className="btn btn-info btn-sm"
//                                       >
//                                         <i className="fas fa-eye me-1"></i>
//                                         තීරණය බලන්න
//                                       </button>
//                                     ) : b.status === "assigned" ? (
//                                       <span className="badge bg-warning">
//                                         බලා සිටින්න
//                                       </span>
//                                     ) : (
//                                       "-"
//                                     )}
//                                   </td>
//                                   <td>
//                                     {b.status === "pending" && "අනුමැතියට"}
//                                     {b.status === "assigned" && "පවරා ඇත"}
//                                     {b.status === "decision-given" &&
//                                       "තීරණය ලබා දී ඇත"}
//                                   </td>
//                                   <td>
//                                     <button
//                                       onClick={() =>
//                                         setExpandedBorrower(
//                                           expandedBorrower === b.id
//                                             ? null
//                                             : b.id
//                                         )
//                                       }
//                                       className="btn btn-info btn-sm"
//                                     >
//                                       <i className="fas fa-eye"></i> විස්තර
//                                     </button>
//                                   </td>
//                                 </tr>
//                                 {expandedBorrower === b.id && (
//                                   <tr>
//                                     <td colSpan="9" className="bg-light">
//                                       <div className="row g-3 p-3">
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-primary border-bottom pb-2">
//                                                 ණයගැතියාගේ සම්පූර්ණ තොරතුරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>නම:</strong>{" "}
//                                                 {b.borrowerName}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ලිපිනය:</strong>{" "}
//                                                 {b.borrowerAddress}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {b.membershipNo}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>
//                                                   ලියාපදිංචි අංකය:
//                                                 </strong>{" "}
//                                                 {b.registrationNo}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>
//                                                   ලියාපදිංචි ලිපිනය:
//                                                 </strong>{" "}
//                                                 {b.registeredAddress}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>
//                                                   ලියාපදිංචි දිනය:
//                                                 </strong>{" "}
//                                                 {b.registrationDate}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>

//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-primary border-bottom pb-2">
//                                                 ණය විස්තර
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>ණය අංකය:</strong>{" "}
//                                                 {b.loanNumber}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ණය මුදල:</strong> රු.{" "}
//                                                 {parseFloat(
//                                                   b.loanAmount
//                                                 ).toLocaleString()}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>පොලිය:</strong> රු.{" "}
//                                                 {parseFloat(
//                                                   b.interest
//                                                 ).toLocaleString()}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>පොලී අනුපාතය:</strong>{" "}
//                                                 {b.interestRate}%
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>
//                                                   ලිපි ද්‍රව්‍ය ගාස්තු:
//                                                 </strong>{" "}
//                                                 රු.{" "}
//                                                 {parseFloat(
//                                                   b.stationeryFees
//                                                 ).toLocaleString()}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>

//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-success border-bottom pb-2">
//                                                 පළමු ඇපකරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>නම:</strong>{" "}
//                                                 {b.guarantor1Name}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ලිපිනය:</strong>{" "}
//                                                 {b.guarantor1Address}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {b.guarantor1MembershipNo}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>

//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-success border-bottom pb-2">
//                                                 දෙවන ඇපකරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>නම:</strong>{" "}
//                                                 {b.guarantor2Name}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ලිපිනය:</strong>{" "}
//                                                 {b.guarantor2Address}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {b.guarantor2MembershipNo}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>

//                                         {b.arbitrationDecision && (
//                                           <div className="col-12">
//                                             <div className="card">
//                                               <div className="card-body">
//                                                 <h6 className="card-title text-info border-bottom pb-2">
//                                                   බේරුම්කරුගේ තීරණය
//                                                 </h6>
//                                                 <p className="mb-1">
//                                                   <strong>
//                                                     ණය ලබා දුන් අවසාන දිනය:
//                                                   </strong>{" "}
//                                                   {b.decisionDate}
//                                                 </p>
//                                                 <p className="mb-1">
//                                                   <strong>
//                                                     ලැබුණු ණය මුදල:
//                                                   </strong>{" "}
//                                                   රු.{" "}
//                                                   {parseFloat(
//                                                     b.finalLoanAmount
//                                                   ).toLocaleString()}
//                                                 </p>
//                                                 <p className="mb-1">
//                                                   <strong>අඩු කළ පොලිය:</strong>{" "}
//                                                   රු.{" "}
//                                                   {parseFloat(
//                                                     b.interestDeducted
//                                                   ).toLocaleString()}
//                                                 </p>
//                                                 <p className="mb-0">
//                                                   <strong>තීරණය:</strong>{" "}
//                                                   {b.arbitrationDecision}
//                                                 </p>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         )}
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 )}
//                               </React.Fragment>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               {submissions.filter((s) => s.society === selectedSociety)
//                 .length === 0 && (
//                 <div className="alert alert-info text-center">
//                   <i className="fas fa-info-circle me-2"></i>
//                   තවමත් අනුමත කළ ඉදිරිපත් කිරීම් නොමැත
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const DistrictDashboard = () => {
//     const districtSubmissions = districtOfficeDistrict
//       ? submissions.filter((s) => s.district === districtOfficeDistrict)
//       : [];

//     return (
//       <div className="container-fluid">
//         <div className="card shadow-lg">
//           <div className="card-body">
//             <h2 className="card-title mb-4">ජිල්ලා කාර්යාල පාලන පුවරුව</h2>

//             <div className="row mb-4">
//               <div className="col-md-6">
//                 <label className="form-label fw-bold">
//                   දිස්ත්‍රික්කය තෝරන්න
//                 </label>
//                 <select
//                   value={districtOfficeDistrict}
//                   onChange={(e) => setDistrictOfficeDistrict(e.target.value)}
//                   className="form-select"
//                 >
//                   <option value="">තෝරන්න</option>
//                   {DISTRICTS.map((d) => (
//                     <option key={d.id} value={d.id}>
//                       {d.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {!districtOfficeDistrict ? (
//               <div className="alert alert-warning">
//                 <i className="fas fa-exclamation-triangle me-2"></i>
//                 කරුණාකර දිස්ත්‍රික්කයක් තෝරන්න
//               </div>
//             ) : (
//               <>
//                 <ul className="nav nav-tabs mb-4">
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link ${
//                         districtTab === "submissions" ? "active" : ""
//                       }`}
//                       onClick={() => setDistrictTab("submissions")}
//                     >
//                       ඉදිරිපත් කිරීම්
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link ${
//                         districtTab === "officers" ? "active" : ""
//                       }`}
//                       onClick={() => setDistrictTab("officers")}
//                     >
//                       බේරුම්කරුවන්
//                     </button>
//                   </li>
//                   <li className="nav-item">
//                     <button
//                       className={`nav-link ${
//                         districtTab === "societies" ? "active" : ""
//                       }`}
//                       onClick={() => setDistrictTab("societies")}
//                     >
//                       සමිති
//                     </button>
//                   </li>
//                 </ul>

//                 {districtTab === "submissions" && (
//                   <>
//                     {districtSubmissions.map((submission) => {
//                       const district = DISTRICTS.find(
//                         (d) => d.id === submission.district
//                       );
//                       const society = societies[submission.district].find(
//                         (s) => s.id === submission.society
//                       );

//                       return (
//                         <div key={submission.id} className="card mb-4">
//                           <div className="card-body">
//                             <h5 className="card-title">{society.name}</h5>
//                             <p className="text-muted mb-1">
//                               දිස්ත්‍රික්කය: {district.name}
//                             </p>
//                             <p className="text-muted">
//                               අනුමත කළ දිනය:{" "}
//                               {submission.approvedDate
//                                 ? new Date(
//                                     submission.approvedDate
//                                   ).toLocaleDateString("si-LK")
//                                 : "-"}
//                             </p>

//                             <div className="table-responsive">
//                               <table className="table table-bordered table-sm">
//                                 <thead className="table-light">
//                                   <tr>
//                                     <th>ණය අංකය</th>
//                                     <th>නම</th>
//                                     <th>ලිපිනය</th>
//                                     <th>ණය මුදල</th>
//                                     <th>පොලිය</th>
//                                     <th>බේරුම් ගාස්තු</th>
//                                     <th>බේරුම් අංකය</th>
//                                     <th>බේරුම්කරු</th>
//                                     <th>තීරණය එකතු කරන්න</th>
//                                     <th>ක්‍රියාව</th>
//                                     <th>විස්තර</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {submission.borrowers.map((borrower) => (
//                                     <React.Fragment key={borrower.id}>
//                                       <tr>
//                                         <td>{borrower.loanNumber}</td>
//                                         <td>{borrower.borrowerName}</td>
//                                         <td>{borrower.borrowerAddress}</td>
//                                         <td>
//                                           රු.{" "}
//                                           {parseFloat(
//                                             borrower.loanAmount
//                                           ).toLocaleString()}
//                                         </td>
//                                         <td>
//                                           රු.{" "}
//                                           {parseFloat(
//                                             borrower.interest
//                                           ).toLocaleString()}
//                                         </td>
//                                         <td className="text-center">
//                                           {borrower.arbitrationFeePaid ? (
//                                             <span className="badge bg-success">
//                                               ගෙවා ඇත
//                                             </span>
//                                           ) : (
//                                             <div className="btn-group btn-group-sm">
//                                               <button
//                                                 onClick={() =>
//                                                   updateArbitrationFee(
//                                                     submission.id,
//                                                     borrower.id,
//                                                     false
//                                                   )
//                                                 }
//                                                 className="btn btn-danger"
//                                               >
//                                                 නොගෙවා
//                                               </button>
//                                               <button
//                                                 onClick={() =>
//                                                   updateArbitrationFee(
//                                                     submission.id,
//                                                     borrower.id,
//                                                     true
//                                                   )
//                                                 }
//                                                 className="btn btn-success"
//                                               >
//                                                 ගෙවා ඇත
//                                               </button>
//                                             </div>
//                                           )}
//                                         </td>
//                                         <td className="fw-bold text-primary">
//                                           {borrower.arbitrationNumber || "-"}
//                                         </td>
//                                         <td>
//                                           {borrower.assignedOfficer || "-"}
//                                         </td>
//                                         <td className="text-center">
//                                           {borrower.status === "assigned" &&
//                                             !borrower.arbitrationDecision && (
//                                               <button
//                                                 onClick={() =>
//                                                   openDecisionModal(
//                                                     submission.id,
//                                                     borrower.id
//                                                   )
//                                                 }
//                                                 className="btn btn-info btn-sm"
//                                               >
//                                                 තීරණය එකතු කරන්න
//                                               </button>
//                                             )}
//                                           {borrower.arbitrationDecision && (
//                                             <button
//                                               onClick={() =>
//                                                 openDecisionDetailsModal(
//                                                   borrower
//                                                 )
//                                               }
//                                               className="btn btn-success btn-sm"
//                                             >
//                                               <i className="fas fa-eye me-1"></i>
//                                               තීරණය බලන්න
//                                             </button>
//                                           )}
//                                         </td>
//                                         <td className="text-center">
//                                           {borrower.arbitrationNumber && (
//                                             <button
//                                               onClick={() =>
//                                                 generateLetter(
//                                                   borrower,
//                                                   submission
//                                                 )
//                                               }
//                                               className="btn btn-primary btn-sm"
//                                             >
//                                               <i className="fas fa-file-alt"></i>{" "}
//                                               ලිපිය
//                                             </button>
//                                           )}
//                                         </td>
//                                         <td>
//                                           <button
//                                             onClick={() =>
//                                               setExpandedBorrower(
//                                                 expandedBorrower === borrower.id
//                                                   ? null
//                                                   : borrower.id
//                                               )
//                                             }
//                                             className="btn btn-info btn-sm"
//                                           >
//                                             <i className="fas fa-eye"></i>{" "}
//                                             විස්තර
//                                           </button>
//                                         </td>
//                                       </tr>
//                                       {expandedBorrower === borrower.id && (
//                                         <tr>
//                                           <td colSpan="11" className="bg-light">
//                                             <div className="row g-3 p-3">
//                                               <div className="col-md-6">
//                                                 <div className="card">
//                                                   <div className="card-body">
//                                                     <h6 className="card-title text-primary border-bottom pb-2">
//                                                       ණයගැතියාගේ සම්පූර්ණ
//                                                       තොරතුරු
//                                                     </h6>
//                                                     <p className="mb-1">
//                                                       <strong>නම:</strong>{" "}
//                                                       {borrower.borrowerName}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>ලිපිනය:</strong>{" "}
//                                                       {borrower.borrowerAddress}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>
//                                                         සාමාජික අංකය:
//                                                       </strong>{" "}
//                                                       {borrower.membershipNo}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>
//                                                         ලියාපදිංචි අංකය:
//                                                       </strong>{" "}
//                                                       {borrower.registrationNo}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>
//                                                         ලියාපදිංචි ලිපිනය:
//                                                       </strong>{" "}
//                                                       {
//                                                         borrower.registeredAddress
//                                                       }
//                                                     </p>
//                                                     <p className="mb-0">
//                                                       <strong>
//                                                         ලියාපදිංචි දිනය:
//                                                       </strong>{" "}
//                                                       {
//                                                         borrower.registrationDate
//                                                       }
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>

//                                               <div className="col-md-6">
//                                                 <div className="card">
//                                                   <div className="card-body">
//                                                     <h6 className="card-title text-primary border-bottom pb-2">
//                                                       ණය විස්තර
//                                                     </h6>
//                                                     <p className="mb-1">
//                                                       <strong>ණය අංකය:</strong>{" "}
//                                                       {borrower.loanNumber}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>ණය මුදල:</strong>{" "}
//                                                       රු.{" "}
//                                                       {parseFloat(
//                                                         borrower.loanAmount
//                                                       ).toLocaleString()}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>පොලිය:</strong>{" "}
//                                                       රු.{" "}
//                                                       {parseFloat(
//                                                         borrower.interest
//                                                       ).toLocaleString()}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>
//                                                         පොලී අනුපාතය:
//                                                       </strong>{" "}
//                                                       {borrower.interestRate}%
//                                                     </p>
//                                                     <p className="mb-0">
//                                                       <strong>
//                                                         ලිපි ද්‍රව්‍ය ගාස්තු:
//                                                       </strong>{" "}
//                                                       රු.{" "}
//                                                       {parseFloat(
//                                                         borrower.stationeryFees
//                                                       ).toLocaleString()}
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>

//                                               <div className="col-md-6">
//                                                 <div className="card">
//                                                   <div className="card-body">
//                                                     <h6 className="card-title text-success border-bottom pb-2">
//                                                       පළමු ඇපකරු
//                                                     </h6>
//                                                     <p className="mb-1">
//                                                       <strong>නම:</strong>{" "}
//                                                       {borrower.guarantor1Name}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>ලිපිනය:</strong>{" "}
//                                                       {
//                                                         borrower.guarantor1Address
//                                                       }
//                                                     </p>
//                                                     <p className="mb-0">
//                                                       <strong>
//                                                         සාමාජික අංකය:
//                                                       </strong>{" "}
//                                                       {
//                                                         borrower.guarantor1MembershipNo
//                                                       }
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>

//                                               <div className="col-md-6">
//                                                 <div className="card">
//                                                   <div className="card-body">
//                                                     <h6 className="card-title text-success border-bottom pb-2">
//                                                       දෙවන ඇපකරු
//                                                     </h6>
//                                                     <p className="mb-1">
//                                                       <strong>නම:</strong>{" "}
//                                                       {borrower.guarantor2Name}
//                                                     </p>
//                                                     <p className="mb-1">
//                                                       <strong>ලිපිනය:</strong>{" "}
//                                                       {
//                                                         borrower.guarantor2Address
//                                                       }
//                                                     </p>
//                                                     <p className="mb-0">
//                                                       <strong>
//                                                         සාමාජික අංකය:
//                                                       </strong>{" "}
//                                                       {
//                                                         borrower.guarantor2MembershipNo
//                                                       }
//                                                     </p>
//                                                   </div>
//                                                 </div>
//                                               </div>

//                                               {borrower.arbitrationDecision && (
//                                                 <div className="col-12">
//                                                   <div className="card">
//                                                     <div className="card-body">
//                                                       <h6 className="card-title text-info border-bottom pb-2">
//                                                         බේරුම්කරුගේ තීරණය
//                                                       </h6>
//                                                       <p className="mb-1">
//                                                         <strong>
//                                                           ණය ලබා දුන් අවසාන
//                                                           දිනය:
//                                                         </strong>{" "}
//                                                         {borrower.decisionDate}
//                                                       </p>
//                                                       <p className="mb-1">
//                                                         <strong>
//                                                           ලැබුණු ණය මුදල:
//                                                         </strong>{" "}
//                                                         රු.{" "}
//                                                         {parseFloat(
//                                                           borrower.finalLoanAmount
//                                                         ).toLocaleString()}
//                                                       </p>
//                                                       <p className="mb-1">
//                                                         <strong>
//                                                           අඩු කළ පොලිය:
//                                                         </strong>{" "}
//                                                         රු.{" "}
//                                                         {parseFloat(
//                                                           borrower.interestDeducted
//                                                         ).toLocaleString()}
//                                                       </p>
//                                                       <p className="mb-0">
//                                                         <strong>තීරණය:</strong>{" "}
//                                                         {
//                                                           borrower.arbitrationDecision
//                                                         }
//                                                       </p>
//                                                     </div>
//                                                   </div>
//                                                 </div>
//                                               )}
//                                             </div>
//                                           </td>
//                                         </tr>
//                                       )}
//                                     </React.Fragment>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })}

//                     {districtSubmissions.length === 0 && (
//                       <div className="alert alert-info text-center">
//                         මෙම දිස්ත්‍රික්කයේ තවමත් ඉදිරිපත් කිරීම් නොමැත
//                       </div>
//                     )}
//                   </>
//                 )}

//                 {districtTab === "officers" && (
//                   <div>
//                     <h5 className="mb-4">බේරුම්කරුවන් කළමනාකරණය</h5>

//                     <div className="card bg-light mb-4">
//                       <div className="card-body">
//                         <h6 className="card-title">
//                           නව බේරුම්කරුවෙකු එකතු කරන්න
//                         </h6>
//                         <div className="row g-3">
//                           <div className="col-md-6">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="නම"
//                               value={newOfficer.name}
//                               onChange={(e) =>
//                                 setNewOfficer({
//                                   ...newOfficer,
//                                   name: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div className="col-md-6">
//                             <button
//                               onClick={() => {
//                                 if (!newOfficer.name) {
//                                   showAlert(
//                                     "දෝෂයකි!",
//                                     "කරුණාකර නම ඇතුළත් කරන්න",
//                                     "warning"
//                                   );
//                                   return;
//                                 }
//                                 const officer = {
//                                   id: "ao-" + Date.now(),
//                                   name: newOfficer.name,
//                                   district: districtOfficeDistrict,
//                                   assignedTo: null,
//                                 };
//                                 setArbitrationOfficers([
//                                   ...arbitrationOfficers,
//                                   officer,
//                                 ]);
//                                 setNewOfficer({ name: "", district: "" });
//                                 showAlert(
//                                   "සාර්ථකයි!",
//                                   "බේරුම්කරු සාර්ථකව එකතු කරන ලදී!",
//                                   "success"
//                                 );
//                               }}
//                               className="btn btn-success w-100"
//                             >
//                               එකතු කරන්න
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="table-responsive">
//                       <table className="table table-bordered table-hover">
//                         <thead className="table-light">
//                           <tr>
//                             <th>නම</th>
//                             <th>තත්වය</th>
//                             <th>පවරා ඇති සමිතිය</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {arbitrationOfficers
//                             .filter(
//                               (ao) => ao.district === districtOfficeDistrict
//                             )
//                             .map((officer) => {
//                               const assignedSociety = officer.assignedTo
//                                 ? societies[officer.district].find(
//                                     (s) => s.id === officer.assignedTo
//                                   )
//                                 : null;

//                               return (
//                                 <tr key={officer.id}>
//                                   <td>{officer.name}</td>
//                                   <td className="text-center">
//                                     {officer.assignedTo === null ? (
//                                       <span className="badge bg-success">
//                                         ලබා ගත හැකිය
//                                       </span>
//                                     ) : (
//                                       <span className="badge bg-danger">
//                                         පවරා ඇත
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td>
//                                     {assignedSociety
//                                       ? assignedSociety.name
//                                       : "-"}
//                                   </td>
//                                 </tr>
//                               );
//                             })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}

//                 {districtTab === "societies" && (
//                   <div>
//                     <h5 className="mb-4">සමිති කළමනාකරණය</h5>

//                     <div className="card bg-light mb-4">
//                       <div className="card-body">
//                         <h6 className="card-title">නව සමිතියක් එකතු කරන්න</h6>
//                         <div className="row g-3">
//                           <div className="col-md-6">
//                             <input
//                               type="text"
//                               className="form-control"
//                               placeholder="සමිතියේ නම"
//                               value={newSociety.name}
//                               onChange={(e) =>
//                                 setNewSociety({
//                                   ...newSociety,
//                                   name: e.target.value,
//                                 })
//                               }
//                             />
//                           </div>
//                           <div className="col-md-6">
//                             <button
//                               onClick={() => {
//                                 if (!newSociety.name) {
//                                   showAlert(
//                                     "දෝෂයකි!",
//                                     "කරුණාකර සමිතියේ නම ඇතුළත් කරන්න",
//                                     "warning"
//                                   );
//                                   return;
//                                 }
//                                 const society = {
//                                   id:
//                                     districtOfficeDistrict.substring(0, 1) +
//                                     "-s-" +
//                                     Date.now(),
//                                   name: newSociety.name,
//                                 };
//                                 setSocieties({
//                                   ...societies,
//                                   [districtOfficeDistrict]: [
//                                     ...societies[districtOfficeDistrict],
//                                     society,
//                                   ],
//                                 });
//                                 setNewSociety({ name: "", district: "" });
//                                 showAlert(
//                                   "සාර්ථකයි!",
//                                   "සමිතිය සාර්ථකව එකතු කරන ලදී!",
//                                   "success"
//                                 );
//                               }}
//                               className="btn btn-success w-100"
//                             >
//                               එකතු කරන්න
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="table-responsive">
//                       <table className="table table-bordered table-hover">
//                         <thead className="table-light">
//                           <tr>
//                             <th>සමිතියේ නම</th>
//                             <th>ඉදිරිපත් කිරීම් ගණන</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {societies[districtOfficeDistrict].map((society) => {
//                             const submissionCount = submissions.filter(
//                               (s) =>
//                                 s.society === society.id &&
//                                 s.district === districtOfficeDistrict
//                             ).length;

//                             return (
//                               <tr key={society.id}>
//                                 <td>{society.name}</td>
//                                 <td className="text-center">
//                                   {submissionCount}
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const ProvincialDashboard = () => (
//     <div className="container-fluid">
//       <div className="card shadow-lg">
//         <div className="card-body">
//           <h2 className="card-title mb-4">පළාත් කාර්යාල පාලන පුවරුව</h2>
//           <p className="text-muted mb-4">
//             මධ්‍ය පළාතේ සියලුම දිස්ත්‍රික්ක වල තොරතුරු
//           </p>

//           {DISTRICTS.map((district) => {
//             const districtSubmissions = submissions.filter(
//               (s) => s.district === district.id
//             );
//             const totalBorrowers = districtSubmissions.reduce(
//               (sum, sub) => sum + sub.borrowers.length,
//               0
//             );
//             const completedDecisions = districtSubmissions
//               .flatMap((s) => s.borrowers)
//               .filter((b) => b.status === "decision-given").length;

//             return (
//               <div key={district.id} className="card mb-4 border-primary">
//                 <div className="card-header bg-primary text-white">
//                   <h4 className="mb-0">
//                     <i className="fas fa-map-marker-alt me-2"></i>
//                     {district.name} දිස්ත්‍රික්කය
//                   </h4>
//                 </div>
//                 <div className="card-body">
//                   <div className="row mb-3">
//                     <div className="col-md-3">
//                       <div className="card bg-info text-white">
//                         <div className="card-body text-center">
//                           <h5 className="card-title">ඉදිරිපත් කිරීම්</h5>
//                           <h2>{districtSubmissions.length}</h2>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-3">
//                       <div className="card bg-warning text-white">
//                         <div className="card-body text-center">
//                           <h5 className="card-title">ණයගැතියන්</h5>
//                           <h2>{totalBorrowers}</h2>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-3">
//                       <div className="card bg-success text-white">
//                         <div className="card-body text-center">
//                           <h5 className="card-title">තීරණ</h5>
//                           <h2>{completedDecisions}</h2>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="col-md-3">
//                       <div className="card bg-secondary text-white">
//                         <div className="card-body text-center">
//                           <h5 className="card-title">සමිති</h5>
//                           <h2>{societies[district.id].length}</h2>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {districtSubmissions.length > 0 ? (
//                     districtSubmissions.map((submission) => {
//                       const society = societies[submission.district].find(
//                         (s) => s.id === submission.society
//                       );

//                       return (
//                         <div key={submission.id} className="card mb-3">
//                           <div className="card-header">
//                             <h6 className="mb-0">{society.name}</h6>
//                             <small className="text-muted">
//                               අනුමත කළ දිනය:{" "}
//                               {submission.approvedDate
//                                 ? new Date(
//                                     submission.approvedDate
//                                   ).toLocaleDateString("si-LK")
//                                 : "-"}
//                             </small>
//                           </div>
//                           <div className="card-body">
//                             <div className="table-responsive">
//                               <table className="table table-sm table-bordered">
//                                 <thead className="table-light">
//                                   <tr>
//                                     <th>ණය අංකය</th>
//                                     <th>ණයගැතියා</th>
//                                     <th>ණය මුදල</th>
//                                     <th>බේරුම් අංකය</th>
//                                     <th>බේරුම්කරු</th>
//                                     <th>තත්වය</th>
//                                     <th>තීරණය</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {submission.borrowers.map((borrower) => (
//                                     <tr key={borrower.id}>
//                                       <td>{borrower.loanNumber}</td>
//                                       <td>{borrower.borrowerName}</td>
//                                       <td>
//                                         රු.{" "}
//                                         {parseFloat(
//                                           borrower.loanAmount
//                                         ).toLocaleString()}
//                                       </td>
//                                       <td>
//                                         {borrower.arbitrationNumber || "-"}
//                                       </td>
//                                       <td>{borrower.assignedOfficer || "-"}</td>
//                                       <td>
//                                         {borrower.status === "pending" && (
//                                           <span className="badge bg-warning">
//                                             අනුමැතියට
//                                           </span>
//                                         )}
//                                         {borrower.status === "assigned" && (
//                                           <span className="badge bg-info">
//                                             පවරා ඇත
//                                           </span>
//                                         )}
//                                         {borrower.status ===
//                                           "decision-given" && (
//                                           <span className="badge bg-success">
//                                             තීරණය ලබා දී ඇත
//                                           </span>
//                                         )}
//                                       </td>
//                                       <td className="text-center">
//                                         {borrower.arbitrationDecision ? (
//                                           <button
//                                             onClick={() =>
//                                               openDecisionDetailsModal(borrower)
//                                             }
//                                             className="btn btn-info btn-sm"
//                                           >
//                                             <i className="fas fa-eye me-1"></i>
//                                             තීරණය බලන්න
//                                           </button>
//                                         ) : borrower.status === "assigned" ? (
//                                           <span className="badge bg-warning">
//                                             බලා සිටින්න
//                                           </span>
//                                         ) : (
//                                           "-"
//                                         )}
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </table>
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <div className="alert alert-info">
//                       මෙම දිස්ත්‍රික්කයේ තවමත් ඉදිරිපත් කිරීම් නොමැත
//                     </div>
//                   )}
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div
//       style={{
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         minHeight: "100vh",
//         padding: "30px 0",
//       }}
//     >
//       <div className="container">
//         <div className="card shadow-lg mb-4">
//           <div className="card-body text-center">
//             <h1 className="mb-2">මධ්‍ය පළාත් ණය එකතු කිරීමේ පද්ධතිය</h1>
//             <p className="text-muted mb-4">
//               Central Province Debt Collection System
//             </p>

//             <div className="d-flex gap-3 justify-content-center flex-wrap">
//               <button
//                 onClick={() => setUserRole("society")}
//                 className={`btn ${
//                   userRole === "society" ? "btn-primary" : "btn-outline-primary"
//                 } btn-lg`}
//               >
//                 <i className="fas fa-building me-2"></i>සමිති ප්‍රවේශය
//               </button>
//               <button
//                 onClick={() => setUserRole("district")}
//                 className={`btn ${
//                   userRole === "district"
//                     ? "btn-primary"
//                     : "btn-outline-primary"
//                 } btn-lg`}
//               >
//                 <i className="fas fa-landmark me-2"></i>ජිල්ලා කාර්යාල ප්‍රවේශය
//               </button>
//               <button
//                 onClick={() => setUserRole("provincial")}
//                 className={`btn ${
//                   userRole === "provincial"
//                     ? "btn-primary"
//                     : "btn-outline-primary"
//                 } btn-lg`}
//               >
//                 <i className="fas fa-city me-2"></i>පළාත් කාර්යාල ප්‍රවේශය
//               </button>
//             </div>
//           </div>
//         </div>

//         {userRole === "society" && <SocietyDashboard />}
//         {userRole === "district" && <DistrictDashboard />}
//         {userRole === "provincial" && <ProvincialDashboard />}
//       </div>

//       <AlertModal />
//       <DecisionModal />
//       <DecisionDetailsModal />
//     </div>
//   );
// };

// export default App;

// import React, { useState, useEffect, createContext, useContext } from "react";
// import {
//   Camera,
//   FileText,
//   Users,
//   Building,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
// } from "lucide-react";

// // Auth Context
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const userData = localStorage.getItem("user");
//     if (token && userData) {
//       setUser(JSON.parse(userData));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// // API Service
// const API_BASE_URL = "http://localhost:8080/api";

// const api = {
//   async request(endpoint, options = {}) {
//     const token = localStorage.getItem("token");
//     const headers = {
//       "Content-Type": "application/json",
//       ...options.headers,
//     };

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       ...options,
//       headers,
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Request failed");
//     }

//     return response.json();
//   },

//   // Auth endpoints
//   login: (data) =>
//     api.request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
//   signup: (data) =>
//     api.request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),

//   // Districts
//   getDistricts: () => api.request("/districts"),

//   // Societies
//   getSocieties: () => api.request("/societies"),
//   getSocietiesByDistrict: (districtId) =>
//     api.request(`/societies/district/${districtId}`),
//   createSociety: (data) =>
//     api.request("/societies", { method: "POST", body: JSON.stringify(data) }),

//   // Officers
//   getOfficersByDistrict: (districtId) =>
//     api.request(`/officers/district/${districtId}`),
//   createOfficer: (data) =>
//     api.request("/officers", { method: "POST", body: JSON.stringify(data) }),

//   // Submissions
//   createSubmission: (data) =>
//     api.request("/submissions", { method: "POST", body: JSON.stringify(data) }),
//   approveSubmission: (id) =>
//     api.request(`/submissions/${id}/approve`, { method: "PUT" }),
//   rejectSubmission: (id, reason) =>
//     api.request(`/submissions/${id}/reject`, {
//       method: "PUT",
//       body: JSON.stringify({ reason }),
//     }),
//   getSubmissionsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}`),
//   getPendingApprovalsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}/pending`),
//   getApprovedSubmissionsByDistrict: (districtId) =>
//     api.request(`/submissions/district/${districtId}/approved`),
//   updateArbitrationFee: (submissionId, borrowerId, isPaid) =>
//     api.request(`/submissions/${submissionId}/borrowers/${borrowerId}/fee`, {
//       method: "PUT",
//       body: JSON.stringify({ isPaid }),
//     }),
//   addArbitrationDecision: (submissionId, borrowerId, data) =>
//     api.request(
//       `/submissions/${submissionId}/borrowers/${borrowerId}/decision`,
//       {
//         method: "PUT",
//         body: JSON.stringify(data),
//       }
//     ),
// };

// // Login Component
// const Login = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await api.login(formData);
//       login(response, response.token);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="card shadow" style={{ maxWidth: "400px", width: "100%" }}>
//         <div className="card-body p-4">
//           <h2 className="text-center mb-4">ඍණ අය කිරීමේ පද්ධතිය</h2>
//           <h5 className="text-center text-muted mb-4">Login</h5>

//           {error && (
//             <div className="alert alert-danger" role="alert">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Signup = ({ onBackToLogin }) => {
//   const [userType, setUserType] = useState("SOCIETY_MEMBER");
//   const [districts, setDistricts] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     district: "",
//     society: "",
//     designation: "",
//     userType: "SOCIETY_MEMBER",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // 🔹 Load different district lists depending on userType
//     if (userType === "SOCIETY_MEMBER") {
//       loadDistricts(); // load from API
//     } else if (userType === "OFFICER") {
//       // officer signup: fixed list
//       setDistricts([
//         { id: 1, name: "Nuwara Eliya" },
//         { id: 2, name: "Matale" },
//         { id: 3, name: "Kandy" },
//       ]);
//     }
//   }, [userType]);

//   useEffect(() => {
//     if (formData.district && userType === "SOCIETY_MEMBER") {
//       loadSocieties(formData.district);
//     }
//   }, [formData.district, userType]);

//   const loadDistricts = async () => {
//     try {
//       const data = await api.getDistricts();
//       setDistricts(data);
//     } catch (err) {
//       setError("Failed to load districts");
//     }
//   };

//   const loadSocieties = async (districtId) => {
//     try {
//       const data = await api.getSocietiesByDistrict(districtId);
//       setSocieties(data);
//     } catch (err) {
//       setError("Failed to load societies");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       await api.signup({ ...formData, userType });
//       setSuccess("Registration successful! Please login.");
//       setFormData({
//         email: "",
//         password: "",
//         name: "",
//         district: "",
//         society: "",
//         designation: "",
//         userType,
//       });
//       setTimeout(() => onBackToLogin(), 2000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
//       <div className="card shadow" style={{ maxWidth: "500px", width: "100%" }}>
//         <div className="card-body p-4">
//           <h2 className="text-center mb-4">Register</h2>

//           {error && <div className="alert alert-danger">{error}</div>}
//           {success && <div className="alert alert-success">{success}</div>}

//           <div className="btn-group w-100 mb-4" role="group">
//             <button
//               type="button"
//               className={`btn ${
//                 userType === "SOCIETY_MEMBER"
//                   ? "btn-primary"
//                   : "btn-outline-primary"
//               }`}
//               onClick={() => setUserType("SOCIETY_MEMBER")}
//             >
//               Society Member
//             </button>
//             <button
//               type="button"
//               className={`btn ${
//                 userType === "OFFICER" ? "btn-primary" : "btn-outline-primary"
//               }`}
//               onClick={() => setUserType("OFFICER")}
//             >
//               Officer/Admin
//             </button>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Name (නම)</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 value={formData.email}
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 value={formData.password}
//                 onChange={(e) =>
//                   setFormData({ ...formData, password: e.target.value })
//                 }
//                 minLength={6}
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">District (දිස්ත්‍රික්කය)</label>
//               <select
//                 className="form-select"
//                 value={formData.district}
//                 onChange={(e) =>
//                   setFormData({ ...formData, district: e.target.value })
//                 }
//                 required
//               >
//                 <option value="">Select District</option>
//                 {districts.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             {userType === "SOCIETY_MEMBER" ? (
//               <div className="mb-3">
//                 <label className="form-label">Society (සමිතිය)</label>
//                 <select
//                   className="form-select"
//                   value={formData.society}
//                   onChange={(e) =>
//                     setFormData({ ...formData, society: e.target.value })
//                   }
//                   required
//                   disabled={!formData.district}
//                 >
//                   <option value="">Select Society</option>
//                   {societies.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             ) : (
//               <div className="mb-3">
//                 <label className="form-label">Designation (තනතුර)</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="e.g., District Admin, Provincial Admin"
//                   value={formData.designation}
//                   onChange={(e) =>
//                     setFormData({ ...formData, designation: e.target.value })
//                   }
//                   required
//                 />
//                 <small className="form-text text-muted">
//                   Include "District" or "Provincial" for admin roles
//                 </small>
//               </div>
//             )}

//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={loading}
//             >
//               {loading ? "Registering..." : "Register"}
//             </button>
//           </form>

//           <div className="text-center mt-3">
//             <button className="btn btn-link" onClick={onBackToLogin}>
//               Back to Login
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Dashboard Component
// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const [activeTab, setActiveTab] = useState("home");

//   const isSocietyMember = user?.roles?.includes("SOCIETY_MEMBER");
//   const isDistrictAdmin = user?.roles?.includes("DISTRICT_ADMIN");
//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

//   return (
//     <div className="min-vh-100 bg-light">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
//         <div className="container-fluid">
//           <span className="navbar-brand">ඍණ අය කිරීමේ පද්ධතිය</span>
//           <div className="d-flex align-items-center">
//             <span className="text-white me-3">{user?.name}</span>
//             <button className="btn btn-outline-light btn-sm" onClick={logout}>
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="container-fluid">
//         <div className="row">
//           {/* Sidebar */}
//           <div
//             className="col-md-3 col-lg-2 bg-white shadow-sm p-3"
//             style={{ minHeight: "calc(100vh - 56px)" }}
//           >
//             <div className="nav flex-column">
//               <button
//                 className={`nav-link text-start ${
//                   activeTab === "home" ? "active" : ""
//                 }`}
//                 onClick={() => setActiveTab("home")}
//               >
//                 <FileText size={18} className="me-2" />
//                 Home
//               </button>

//               {isSocietyMember && (
//                 <>
//                   <button
//                     className={`nav-link text-start ${
//                       activeTab === "create-submission" ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab("create-submission")}
//                   >
//                     <FileText size={18} className="me-2" />
//                     New Submission
//                   </button>
//                   <button
//                     className={`nav-link text-start ${
//                       activeTab === "my-submissions" ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab("my-submissions")}
//                   >
//                     <FileText size={18} className="me-2" />
//                     My Submissions
//                   </button>
//                   <button
//                     className={`nav-link text-start ${
//                       activeTab === "pending-approvals" ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab("pending-approvals")}
//                   >
//                     <Clock size={18} className="me-2" />
//                     Pending Approvals
//                   </button>
//                 </>
//               )}

//               {(isDistrictAdmin || isProvincialAdmin) && (
//                 <>
//                   <button
//                     className={`nav-link text-start ${
//                       activeTab === "district-submissions" ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab("district-submissions")}
//                   >
//                     <FileText size={18} className="me-2" />
//                     District Submissions
//                   </button>
//                   <button
//                     className={`nav-link text-start ${
//                       activeTab === "manage-societies" ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab("manage-societies")}
//                   >
//                     <Building size={18} className="me-2" />
//                     Manage Societies
//                   </button>
//                   <button
//                     className={`nav-link text-start ${
//                       activeTab === "manage-officers" ? "active" : ""
//                     }`}
//                     onClick={() => setActiveTab("manage-officers")}
//                   >
//                     <Users size={18} className="me-2" />
//                     Manage Officers
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Main Content */}
//           <div className="col-md-9 col-lg-10 p-4">
//             {activeTab === "home" && <HomeTab user={user} />}
//             {activeTab === "create-submission" && (
//               <CreateSubmissionTab user={user} />
//             )}
//             {activeTab === "my-submissions" && <MySubmissionsTab user={user} />}
//             {activeTab === "pending-approvals" && (
//               <PendingApprovalsTab user={user} />
//             )}
//             {activeTab === "district-submissions" && (
//               <DistrictSubmissionsTab user={user} />
//             )}
//             {activeTab === "manage-societies" && (
//               <ManageSocietiesTab user={user} />
//             )}
//             {activeTab === "manage-officers" && (
//               <ManageOfficersTab user={user} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Home Tab
// const HomeTab = ({ user }) => (
//   <div>
//     <h2 className="mb-4">Welcome, {user?.name}</h2>
//     <div className="row">
//       <div className="col-md-4 mb-3">
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title">Role</h5>
//             <p className="card-text">{user?.roles?.join(", ")}</p>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-4 mb-3">
//         <div className="card">
//           <div className="card-body">
//             <h5 className="card-title">District</h5>
//             <p className="card-text">{user?.district}</p>
//           </div>
//         </div>
//       </div>
//       {user?.society && (
//         <div className="col-md-4 mb-3">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Society</h5>
//               <p className="card-text">{user?.society}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// // Create Submission Tab
// const CreateSubmissionTab = ({ user }) => {
//   const [borrowers, setBorrowers] = useState([
//     {
//       id: Date.now().toString(),
//       loanNumber: "",
//       borrowerName: "",
//       borrowerAddress: "",
//       membershipNo: "",
//       guarantor1Name: "",
//       guarantor1Address: "",
//       guarantor1MembershipNo: "",
//       guarantor2Name: "",
//       guarantor2Address: "",
//       guarantor2MembershipNo: "",
//       loanAmount: "",
//       interest: "",
//       interestRate: "",
//       stationeryFees: "",
//     },
//   ]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const addBorrower = () => {
//     setBorrowers([
//       ...borrowers,
//       {
//         id: Date.now().toString(),
//         loanNumber: "",
//         borrowerName: "",
//         borrowerAddress: "",
//         membershipNo: "",
//         guarantor1Name: "",
//         guarantor1Address: "",
//         guarantor1MembershipNo: "",
//         guarantor2Name: "",
//         guarantor2Address: "",
//         guarantor2MembershipNo: "",
//         loanAmount: "",
//         interest: "",
//         interestRate: "",
//         stationeryFees: "",
//       },
//     ]);
//   };

//   const removeBorrower = (id) => {
//     setBorrowers(borrowers.filter((b) => b.id !== id));
//   };

//   const updateBorrower = (id, field, value) => {
//     setBorrowers(
//       borrowers.map((b) => (b.id === id ? { ...b, [field]: value } : b))
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const submissionData = {
//         districtId: user.district,
//         societyId: user.society,
//         borrowers: borrowers.map(({ id, ...b }) => b),
//       };

//       await api.createSubmission(submissionData);
//       setSuccess("Submission created successfully!");
//       setBorrowers([
//         {
//           id: Date.now().toString(),
//           loanNumber: "",
//           borrowerName: "",
//           borrowerAddress: "",
//           membershipNo: "",
//           guarantor1Name: "",
//           guarantor1Address: "",
//           guarantor1MembershipNo: "",
//           guarantor2Name: "",
//           guarantor2Address: "",
//           guarantor2MembershipNo: "",
//           loanAmount: "",
//           interest: "",
//           interestRate: "",
//           stationeryFees: "",
//         },
//       ]);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="mb-4">Create New Submission</h2>

//       {error && <div className="alert alert-danger">{error}</div>}
//       {success && <div className="alert alert-success">{success}</div>}

//       <form onSubmit={handleSubmit}>
//         {borrowers.map((borrower, index) => (
//           <div key={borrower.id} className="card mb-4">
//             <div className="card-header d-flex justify-content-between align-items-center">
//               <h5>Borrower {index + 1}</h5>
//               {borrowers.length > 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-danger btn-sm"
//                   onClick={() => removeBorrower(borrower.id)}
//                 >
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="card-body">
//               <div className="row">
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">Loan Number (ණය අංකය)</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.loanNumber}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanNumber", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6 mb-3">
//                   <label className="form-label">
//                     Borrower Name (ණය ගැනුම්කරුගේ නම)
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.borrowerName}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerName",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12 mb-3">
//                   <label className="form-label">
//                     Borrower Address (ලිපිනය)
//                   </label>
//                   <textarea
//                     className="form-control"
//                     value={borrower.borrowerAddress}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerAddress",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">Membership No</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.membershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "membershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">
//                     Guarantor 1 Name (ඇපකරු 1)
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">Guarantor 1 Membership</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">
//                     Guarantor 2 Name (ඇපකරු 2)
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4 mb-3">
//                   <label className="form-label">Guarantor 2 Membership</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <label className="form-label">Loan Amount (ණය මුදල)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.loanAmount}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanAmount", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <label className="form-label">Interest (පොළිය)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interest}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "interest", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <label className="form-label">Interest Rate (%)</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interestRate}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "interestRate",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3 mb-3">
//                   <label className="form-label">Stationery Fees</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.stationeryFees}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "stationeryFees",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="d-flex gap-2">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={addBorrower}
//           >
//             Add Another Borrower
//           </button>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? "Submitting..." : "Submit for Approval"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // My Submissions Tab
// const MySubmissionsTab = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2 className="mb-4">My Submissions</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">No submissions found</div>
//       ) : (
//         <div className="table-responsive">
//           <table className="table table-striped">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Borrowers</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((s) => (
//                 <tr key={s.id}>
//                   <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                   <td>{s.borrowers.length}</td>
//                   <td>
//                     <span
//                       className={`badge bg-${
//                         s.status === "approved"
//                           ? "success"
//                           : s.status === "rejected"
//                           ? "danger"
//                           : "warning"
//                       }`}
//                     >
//                       {s.status}
//                     </span>
//                   </td>
//                   <td>
//                     <button className="btn btn-sm btn-info">
//                       View Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// // Pending Approvals Tab
// const PendingApprovalsTab = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   useEffect(() => {
//     loadPendingSubmissions();
//   }, []);

//   const loadPendingSubmissions = async () => {
//     try {
//       const data = await api.getPendingApprovalsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     if (!confirm("Are you sure you want to approve this submission?")) return;

//     setActionLoading(true);
//     try {
//       await api.approveSubmission(id);
//       alert("Submission approved successfully!");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async (id) => {
//     const reason = prompt("Enter rejection reason:");
//     if (!reason) return;

//     setActionLoading(true);
//     try {
//       await api.rejectSubmission(id, reason);
//       alert("Submission rejected");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2 className="mb-4">Pending Approvals</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">No pending approvals</div>
//       ) : (
//         <div className="row">
//           {submissions.map((s) => (
//             <div key={s.id} className="col-12 mb-3">
//               <div className="card">
//                 <div className="card-body">
//                   <h5 className="card-title">
//                     Submission from{" "}
//                     {new Date(s.submittedDate).toLocaleDateString()}
//                   </h5>
//                   <p className="card-text">
//                     <strong>Borrowers:</strong> {s.borrowers.length}
//                     <br />
//                     <strong>Submitted by:</strong> {s.submittedBy}
//                   </p>

//                   <div className="table-responsive mb-3">
//                     <table className="table table-sm">
//                       <thead>
//                         <tr>
//                           <th>Borrower Name</th>
//                           <th>Loan No</th>
//                           <th>Amount</th>
//                           <th>Interest</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {s.borrowers.map((b, idx) => (
//                           <tr key={idx}>
//                             <td>{b.borrowerName}</td>
//                             <td>{b.loanNumber}</td>
//                             <td>Rs. {b.loanAmount}</td>
//                             <td>Rs. {b.interest}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleApprove(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <CheckCircle size={18} className="me-1" />
//                       Approve
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleReject(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <XCircle size={18} className="me-1" />
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // District Submissions Tab
// const DistrictSubmissionsTab = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDecisionModal, setShowDecisionModal] = useState(false);
//   const [decisionData, setDecisionData] = useState({
//     decisionDate: "",
//     finalLoanAmount: "",
//     interestDeducted: "",
//     arbitrationDecision: "",
//   });

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getApprovedSubmissionsByDistrict(user.district);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkFeePaid = async (submissionId, borrowerId) => {
//     if (!confirm("Mark arbitration fee as paid?")) return;

//     try {
//       await api.updateArbitrationFee(submissionId, borrowerId, true);
//       alert(
//         "Fee marked as paid. Arbitration number generated and officer assigned!"
//       );
//       loadSubmissions();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAddDecision = (submission, borrower) => {
//     setSelectedBorrower({ submission, borrower });
//     setShowDecisionModal(true);
//     setDecisionData({
//       decisionDate: new Date().toISOString().split("T")[0],
//       finalLoanAmount: borrower.loanAmount || "",
//       interestDeducted: "",
//       arbitrationDecision: "",
//     });
//   };

//   const submitDecision = async () => {
//     try {
//       await api.addArbitrationDecision(
//         selectedBorrower.submission.id,
//         selectedBorrower.borrower.id,
//         decisionData
//       );
//       alert("Decision added successfully!");
//       setShowDecisionModal(false);
//       loadSubmissions();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2 className="mb-4">District Submissions</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">No approved submissions</div>
//       ) : (
//         <div className="accordion" id="submissionsAccordion">
//           {submissions.map((s, idx) => (
//             <div key={s.id} className="accordion-item">
//               <h2 className="accordion-header">
//                 <button
//                   className="accordion-button collapsed"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target={`#collapse${idx}`}
//                 >
//                   Submission - {new Date(s.submittedDate).toLocaleDateString()}
//                   <span className="badge bg-primary ms-2">
//                     {s.borrowers.length} borrowers
//                   </span>
//                 </button>
//               </h2>
//               <div
//                 id={`collapse${idx}`}
//                 className="accordion-collapse collapse"
//                 data-bs-parent="#submissionsAccordion"
//               >
//                 <div className="accordion-body">
//                   <div className="table-responsive">
//                     <table className="table">
//                       <thead>
//                         <tr>
//                           <th>Borrower</th>
//                           <th>Loan Amount</th>
//                           <th>Fee Paid</th>
//                           <th>Arbitration No</th>
//                           <th>Officer</th>
//                           <th>Status</th>
//                           <th>Actions</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {s.borrowers.map((b) => (
//                           <tr key={b.id}>
//                             <td>
//                               <strong>{b.borrowerName}</strong>
//                               <br />
//                               <small>{b.loanNumber}</small>
//                             </td>
//                             <td>Rs. {b.loanAmount}</td>
//                             <td>
//                               {b.arbitrationFeePaid ? (
//                                 <span className="badge bg-success">Paid</span>
//                               ) : (
//                                 <span className="badge bg-warning">
//                                   Pending
//                                 </span>
//                               )}
//                             </td>
//                             <td>{b.arbitrationNumber || "-"}</td>
//                             <td>{b.assignedOfficerName || "-"}</td>
//                             <td>
//                               <span
//                                 className={`badge bg-${
//                                   b.status === "decision-given"
//                                     ? "success"
//                                     : b.status === "assigned"
//                                     ? "info"
//                                     : "secondary"
//                                 }`}
//                               >
//                                 {b.status}
//                               </span>
//                             </td>
//                             <td>
//                               {!b.arbitrationFeePaid && (
//                                 <button
//                                   className="btn btn-sm btn-primary me-1"
//                                   onClick={() => handleMarkFeePaid(s.id, b.id)}
//                                 >
//                                   Mark Fee Paid
//                                 </button>
//                               )}
//                               {b.status === "assigned" && (
//                                 <button
//                                   className="btn btn-sm btn-success"
//                                   onClick={() => handleAddDecision(s, b)}
//                                 >
//                                   Add Decision
//                                 </button>
//                               )}
//                               {b.status === "decision-given" && (
//                                 <button className="btn btn-sm btn-info">
//                                   View Decision
//                                 </button>
//                               )}
//                             </td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Decision Modal */}
//       {showDecisionModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add Arbitration Decision</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowDecisionModal(false)}
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Decision Date (තීරණ දිනය)
//                   </label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     value={decisionData.decisionDate}
//                     onChange={(e) =>
//                       setDecisionData({
//                         ...decisionData,
//                         decisionDate: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Final Loan Amount (අවසාන ණය මුදල)
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={decisionData.finalLoanAmount}
//                     onChange={(e) =>
//                       setDecisionData({
//                         ...decisionData,
//                         finalLoanAmount: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Interest Deducted (අඩු කළ පොළිය)
//                   </label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={decisionData.interestDeducted}
//                     onChange={(e) =>
//                       setDecisionData({
//                         ...decisionData,
//                         interestDeducted: e.target.value,
//                       })
//                     }
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">
//                     Arbitration Decision (තීරණය)
//                   </label>
//                   <textarea
//                     className="form-control"
//                     rows="4"
//                     value={decisionData.arbitrationDecision}
//                     onChange={(e) =>
//                       setDecisionData({
//                         ...decisionData,
//                         arbitrationDecision: e.target.value,
//                       })
//                     }
//                   ></textarea>
//                 </div>
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowDecisionModal(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={submitDecision}
//                 >
//                   Save Decision
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Manage Societies Tab
// const ManageSocietiesTab = ({ user }) => {
//   const [societies, setSocieties] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district,
//     registrationNo: "",
//     registeredAddress: "",
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [societiesData, districtsData] = await Promise.all([
//         api.getSocietiesByDistrict(user.district),
//         api.getDistricts(),
//       ]);
//       setSocieties(societiesData);
//       setDistricts(districtsData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createSociety(formData);
//       alert("Society created successfully!");
//       setShowModal(false);
//       setFormData({
//         name: "",
//         districtId: user.district,
//         registrationNo: "",
//         registeredAddress: "",
//       });
//       loadData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Societies</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Building size={18} className="me-1" />
//           Add Society
//         </button>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Registration No</th>
//               <th>Address</th>
//               <th>Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {societies.map((s) => (
//               <tr key={s.id}>
//                 <td>{s.name}</td>
//                 <td>{s.registrationNo}</td>
//                 <td>{s.registeredAddress}</td>
//                 <td>{new Date(s.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Society Modal */}
//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Society</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Society Name (සමිති නම)
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">District</label>
//                     <select
//                       className="form-select"
//                       value={formData.districtId}
//                       onChange={(e) =>
//                         setFormData({ ...formData, districtId: e.target.value })
//                       }
//                       required
//                     >
//                       {districts.map((d) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Registration No</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.registrationNo}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registrationNo: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Registered Address (ලියාපදිංචි ලිපිනය)
//                     </label>
//                     <textarea
//                       className="form-control"
//                       value={formData.registeredAddress}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registeredAddress: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Society
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Manage Officers Tab
// const ManageOfficersTab = ({ user }) => {
//   const [officers, setOfficers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadOfficers();
//   }, []);

//   const loadOfficers = async () => {
//     try {
//       const data = await api.getOfficersByDistrict(user.district);
//       setOfficers(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createOfficer(formData);
//       alert("Officer created successfully!");
//       setShowModal(false);
//       setFormData({ name: "", districtId: user.district });
//       loadOfficers();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Arbitration Officers</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Users size={18} className="me-1" />
//           Add Officer
//         </button>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-striped">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>District</th>
//               <th>Status</th>
//               <th>Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {officers.map((o) => (
//               <tr key={o.id}>
//                 <td>{o.name}</td>
//                 <td>{o.districtId}</td>
//                 <td>
//                   {o.assignedToSocietyId ? (
//                     <span className="badge bg-warning">Assigned</span>
//                   ) : (
//                     <span className="badge bg-success">Available</span>
//                   )}
//                 </td>
//                 <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Add Officer Modal */}
//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Officer</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Officer Name (නිලධාරීගේ නම)
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Officer
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Main App Component
// const App = () => {
//   const { user, loading } = useAuth();
//   const [showSignup, setShowSignup] = useState(false);

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <div className="spinner-border text-primary" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {
//     return showSignup ? (
//       <Signup onBackToLogin={() => setShowSignup(false)} />
//     ) : (
//       <div>
//         <Login />
//         <div className="text-center mt-3">
//           <button className="btn btn-link" onClick={() => setShowSignup(true)}>
//             Need an account? Sign up
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return <Dashboard />;
// };

// // Root Component with Bootstrap CSS
// const Root = () => (
//   <AuthProvider>
//     <App />
//   </AuthProvider>
// );

// export default Root;

//corrected code with officer lodin with role
// import React, { useState, useEffect, createContext, useContext } from "react";
// import {
//   Camera,
//   FileText,
//   Users,
//   Building,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Home,
//   LogOut,
//   Menu,
//   Calendar,
//   DollarSign,
//   Percent,
// } from "lucide-react";

// // ==================== Context ====================
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = () => {
//       const storedUser = localStorage.getItem("user");
//       const token = localStorage.getItem("token");

//       if (storedUser && token) {
//         try {
//           setUser(JSON.parse(storedUser));
//         } catch (e) {
//           localStorage.clear();
//         }
//       }
//       setLoading(false);
//     };
//     checkSession();
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// // ==================== API Service ====================
// const API_BASE_URL = "http://localhost:8080/api";

// const api = {
//   async request(endpoint, options = {}) {
//     const token = localStorage.getItem("token");
//     const headers = {
//       "Content-Type": "application/json",
//       ...options.headers,
//     };

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         ...options,
//         headers,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Request failed");
//       }

//       return response.json();
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   },

//   login: (data) =>
//     api.request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
//   signup: (data) =>
//     api.request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
//   getDistricts: () => api.request("/districts"),
//   getSocieties: () => api.request("/societies"),
//   getSocietiesByDistrict: (districtId) => {
//     const headers = { "Content-Type": "application/json" };
//     return fetch(`${API_BASE_URL}/societies/district/${districtId}`, {
//       headers,
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return fetch(`${API_BASE_URL}/societies/district/${districtId}`).then(
//             (r) => r.json()
//           );
//         }
//         return res.json();
//       })
//       .catch(() => []);
//   },
//   createSociety: (data) =>
//     api.request("/societies", { method: "POST", body: JSON.stringify(data) }),
//   getOfficersByDistrict: (districtId) =>
//     api.request(`/officers/district/${districtId}`),
//   createOfficer: (data) =>
//     api.request("/officers", { method: "POST", body: JSON.stringify(data) }),
//   createSubmission: (data) =>
//     api.request("/submissions", { method: "POST", body: JSON.stringify(data) }),
//   approveSubmission: (id) =>
//     api.request(`/submissions/${id}/approve`, { method: "PUT" }),
//   rejectSubmission: (id, reason) =>
//     api.request(`/submissions/${id}/reject`, {
//       method: "PUT",
//       body: JSON.stringify({ reason }),
//     }),
//   getSubmissionsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}`),
//   getPendingApprovalsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}/pending`),
//   getApprovedSubmissionsByDistrict: (districtId) =>
//     api.request(`/submissions/district/${districtId}/approved`),
//   updateArbitrationFee: (submissionId, borrowerId, isPaid) =>
//     api.request(`/submissions/${submissionId}/borrowers/${borrowerId}/fee`, {
//       method: "PUT",
//       body: JSON.stringify({ isPaid }),
//     }),
//   addArbitrationDecision: (submissionId, borrowerId, data) =>
//     api.request(
//       `/submissions/${submissionId}/borrowers/${borrowerId}/decision`,
//       { method: "PUT", body: JSON.stringify(data) }
//     ),
// };

// // ==================== Login Component ====================
// const LoginPage = ({ onShowSignup }) => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await api.login(formData);
//       login(response, response.token);
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-5">
//                 <div className="text-center mb-4">
//                   <h2 className="fw-bold text-primary">ඍණ අය කිරීමේ පද්ධතිය</h2>
//                   <p className="text-muted">
//                     Central Province Debt Collection System
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="alert alert-danger" role="alert">
//                     <AlertCircle size={18} className="me-2" />
//                     {error}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label">Email Address</label>
//                     <input
//                       type="email"
//                       className="form-control form-control-lg"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control form-control-lg"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                       }
//                       placeholder="Enter your password"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-100"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Logging in...
//                       </>
//                     ) : (
//                       "Login"
//                     )}
//                   </button>
//                 </form>

//                 <hr className="my-4" />

//                 <div className="text-center">
//                   <p className="text-muted mb-0">Don't have an account?</p>
//                   <button
//                     className="btn btn-link text-decoration-none"
//                     onClick={onShowSignup}
//                   >
//                     Register Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== Signup Component ====================
// const SignupPage = ({ onBackToLogin }) => {
//   const [userType, setUserType] = useState("SOCIETY");
//   const [districts, setDistricts] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     district: "",
//     society: "",
//     role: "SOCIETY_ADMIN",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadDistricts();
//   }, []);

//   useEffect(() => {
//     if (formData.district && userType === "SOCIETY") {
//       loadSocieties(formData.district);
//     }
//   }, [formData.district, userType]);

//   const loadDistricts = async () => {
//     try {
//       const data = await api.getDistricts();
//       setDistricts(data);
//     } catch (err) {
//       setError("Failed to load districts");
//     }
//   };

//   const loadSocieties = async (districtId) => {
//     try {
//       const data = await api.getSocietiesByDistrict(districtId);
//       setSocieties(data || []);
//       if (!data || data.length === 0) {
//         setError(
//           "No societies found for this district. Please contact admin to add societies first."
//         );
//       }
//     } catch (err) {
//       console.error("Failed to load societies:", err);
//       setSocieties([]);
//       setError("Failed to load societies. Please try again or contact admin.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     setLoading(true);

//     try {
//       const signupData = {
//         email: formData.email,
//         password: formData.password,
//         name: formData.name,
//         district: formData.district,
//         society: userType === "SOCIETY" ? formData.society : null,
//         role: formData.role,
//         userType: userType,
//       };

//       await api.signup(signupData);
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => onBackToLogin(), 2000);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-7">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-5">
//                 <h2 className="text-center mb-4 fw-bold">
//                   Register New Account
//                 </h2>

//                 {error && (
//                   <div className="alert alert-danger">
//                     <AlertCircle size={18} className="me-2" />
//                     {error}
//                   </div>
//                 )}
//                 {success && (
//                   <div className="alert alert-success">
//                     <CheckCircle size={18} className="me-2" />
//                     {success}
//                   </div>
//                 )}

//                 <div className="btn-group w-100 mb-4" role="group">
//                   <button
//                     type="button"
//                     className={`btn ${
//                       userType === "SOCIETY"
//                         ? "btn-primary"
//                         : "btn-outline-primary"
//                     }`}
//                     onClick={() => {
//                       setUserType("SOCIETY");
//                       setFormData({
//                         ...formData,
//                         role: "SOCIETY_ADMIN",
//                         society: "",
//                       });
//                     }}
//                   >
//                     <Users size={18} className="me-2" />
//                     Society Member
//                   </button>
//                   <button
//                     type="button"
//                     className={`btn ${
//                       userType === "OFFICER"
//                         ? "btn-primary"
//                         : "btn-outline-primary"
//                     }`}
//                     onClick={() => {
//                       setUserType("OFFICER");
//                       setFormData({
//                         ...formData,
//                         society: "",
//                         role: "OFFICER",
//                       });
//                     }}
//                   >
//                     <Building size={18} className="me-2" />
//                     Officer/Admin
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Full Name (නම) *</label>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={formData.name}
//                         onChange={(e) =>
//                           setFormData({ ...formData, name: e.target.value })
//                         }
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Email Address *</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         value={formData.email}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Password *</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         value={formData.password}
//                         onChange={(e) =>
//                           setFormData({ ...formData, password: e.target.value })
//                         }
//                         minLength={6}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Confirm Password *</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         value={formData.confirmPassword}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         minLength={6}
//                         required
//                       />
//                     </div>

//                     <div className="col-12 mb-3">
//                       <label className="form-label">
//                         District (දිස්ත්‍රික්කය) *
//                       </label>
//                       <select
//                         className="form-select"
//                         value={formData.district}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             district: e.target.value,
//                             society: "",
//                           })
//                         }
//                         required
//                       >
//                         <option value="">Select District</option>
//                         {districts.map((d) => (
//                           <option key={d.id} value={d.id}>
//                             {d.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {userType === "SOCIETY" ? (
//                       <>
//                         <div className="col-12 mb-3">
//                           <label className="form-label">
//                             Society (සමිතිය) *
//                           </label>
//                           <select
//                             className="form-select"
//                             value={formData.society}
//                             onChange={(e) =>
//                               setFormData({
//                                 ...formData,
//                                 society: e.target.value,
//                               })
//                             }
//                             required
//                             disabled={!formData.district}
//                           >
//                             <option value="">Select Society</option>
//                             {societies.map((s) => (
//                               <option key={s.id} value={s.id}>
//                                 {s.name}
//                               </option>
//                             ))}
//                           </select>
//                           {!formData.district && (
//                             <small className="text-muted">
//                               Please select a district first
//                             </small>
//                           )}
//                         </div>

//                         <div className="col-12 mb-3">
//                           <label className="form-label">Role (භූමිකාව) *</label>
//                           <select
//                             className="form-select"
//                             value={formData.role}
//                             onChange={(e) =>
//                               setFormData({ ...formData, role: e.target.value })
//                             }
//                             required
//                           >
//                             <option value="SOCIETY_ADMIN">
//                               Society Admin - Creates Submissions (ඉදිරිපත්
//                               කිරීම් නිර්මාණය කරයි)
//                             </option>
//                             <option value="SOCIETY_APPROVAL">
//                               Society Approval - Approves Submissions (ඉදිරිපත්
//                               කිරීම් අනුමත කරයි)
//                             </option>
//                           </select>
//                           <small className="text-muted">
//                             {formData.role === "SOCIETY_ADMIN"
//                               ? "Society Admin creates borrower submissions and sends to approval officer"
//                               : "Society Approval Officer reviews and approves/rejects submissions to send to District Office"}
//                           </small>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="col-12 mb-3">
//                         <label className="form-label">Role (භූමිකාව) *</label>
//                         <select
//                           className="form-select"
//                           value={formData.role}
//                           onChange={(e) =>
//                             setFormData({ ...formData, role: e.target.value })
//                           }
//                           required
//                         >
//                           <option value="OFFICER">
//                             Officer - Arbitration Officer (බේරුම්කරු)
//                           </option>
//                           <option value="DISTRICT_ADMIN">
//                             District Admin - District Office Administrator
//                             (ජිල්ලා පරිපාලක)
//                           </option>
//                           <option value="PROVINCIAL_ADMIN">
//                             Provincial Admin - Provincial Office Administrator
//                             (පළාත් පරිපාලක)
//                           </option>
//                         </select>
//                         <small className="text-muted">
//                           {formData.role === "OFFICER" &&
//                             "Arbitration Officer handles case decisions"}
//                           {formData.role === "DISTRICT_ADMIN" &&
//                             "District Admin manages district-level operations, societies, and officers"}
//                           {formData.role === "PROVINCIAL_ADMIN" &&
//                             "Provincial Admin oversees all districts in the province"}
//                         </small>
//                       </div>
//                     )}
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-100 mt-3"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Registering...
//                       </>
//                     ) : (
//                       "Register"
//                     )}
//                   </button>
//                 </form>

//                 <hr className="my-4" />

//                 <div className="text-center">
//                   <button className="btn btn-link" onClick={onBackToLogin}>
//                     Already have an account? Login
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== Dashboard Layout ====================
// const DashboardLayout = ({ sidebar, content }) => {
//   const { user, logout } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <nav className="navbar navbar-dark bg-primary shadow-sm">
//         <div className="container-fluid">
//           <button
//             className="btn btn-link text-white d-md-none"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu size={24} />
//           </button>
//           <span className="navbar-brand mb-0 h1">ඍණ අය කිරීමේ පද්ධතිය</span>
//           <div className="d-flex align-items-center">
//             <span className="text-white me-3 d-none d-md-inline">
//               {user?.name}
//             </span>
//             <span className="badge bg-light text-primary me-3">
//               {user?.roles?.join(", ")}
//             </span>
//             <button className="btn btn-outline-light btn-sm" onClick={logout}>
//               <LogOut size={18} className="me-1" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="flex-grow-1 d-flex">
//         <div
//           className={`bg-white border-end ${
//             sidebarOpen ? "d-block" : "d-none"
//           } ${sidebarOpen ? "col-md-3 col-lg-2" : ""}`}
//           style={{ minHeight: "100%" }}
//         >
//           {sidebar}
//         </div>

//         <div className="flex-grow-1 p-4 bg-light">{content}</div>
//       </div>
//     </div>
//   );
// };

// // ==================== Dashboard Component ====================
// const Dashboard = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("home");

//   const isSocietyAdmin = user?.roles?.includes("SOCIETY_ADMIN");
//   const isSocietyApproval = user?.roles?.includes("SOCIETY_APPROVAL");
//   const isDistrictAdmin = user?.roles?.includes("DISTRICT_ADMIN");
//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");
//   const isAdmin = isDistrictAdmin || isProvincialAdmin;

//   const NavItem = ({ id, icon: Icon, label }) => (
//     <button
//       className={`nav-link text-start w-100 ${
//         activeTab === id ? "active bg-primary text-white" : "text-dark"
//       }`}
//       onClick={() => setActiveTab(id)}
//     >
//       <Icon size={18} className="me-2" />
//       {label}
//     </button>
//   );

//   const sidebar = (
//     <div className="p-3">
//       <nav className="nav flex-column">
//         <NavItem id="home" icon={Home} label="Home" />

//         {isSocietyAdmin && (
//           <>
//             <NavItem
//               id="create-submission"
//               icon={FileText}
//               label="Create Submission"
//             />
//             <NavItem
//               id="my-submissions"
//               icon={FileText}
//               label="My Submissions"
//             />
//           </>
//         )}

//         {isSocietyApproval && (
//           <>
//             <NavItem
//               id="pending-approvals"
//               icon={Clock}
//               label="Pending Approvals"
//             />
//             <NavItem
//               id="approved-submissions"
//               icon={CheckCircle}
//               label="Approved Submissions"
//             />
//           </>
//         )}

//         {isAdmin && (
//           <>
//             <NavItem
//               id="district-submissions"
//               icon={FileText}
//               label="District Submissions"
//             />
//             {isProvincialAdmin && (
//               <NavItem
//                 id="provincial-overview"
//                 icon={Building}
//                 label="Provincial Overview"
//               />
//             )}
//             <NavItem
//               id="manage-societies"
//               icon={Building}
//               label="Manage Societies"
//             />
//             <NavItem
//               id="manage-officers"
//               icon={Users}
//               label="Manage Officers"
//             />
//           </>
//         )}
//       </nav>
//     </div>
//   );

//   let content;
//   if (activeTab === "home") {
//     content = <HomePage user={user} />;
//   } else if (activeTab === "create-submission") {
//     content = <CreateSubmissionPage user={user} />;
//   } else if (activeTab === "my-submissions") {
//     content = <MySubmissionsPage user={user} />;
//   } else if (activeTab === "pending-approvals") {
//     content = <PendingApprovalsPage user={user} />;
//   } else if (activeTab === "approved-submissions") {
//     content = <ApprovedSubmissionsPage user={user} />;
//   } else if (activeTab === "district-submissions") {
//     content = <DistrictSubmissionsPage user={user} />;
//   } else if (activeTab === "provincial-overview") {
//     content = <ProvincialOverviewPage user={user} />;
//   } else if (activeTab === "manage-societies") {
//     content = <ManageSocietiesPage user={user} />;
//   } else if (activeTab === "manage-officers") {
//     content = <ManageOfficersPage user={user} />;
//   }

//   return <DashboardLayout sidebar={sidebar} content={content} />;
// };

// // ==================== Home Page ====================
// const HomePage = ({ user }) => (
//   <div>
//     <h2 className="mb-4">Welcome, {user?.name}!</h2>
//     <div className="row g-4">
//       <div className="col-md-4">
//         <div className="card border-0 shadow-sm h-100">
//           <div className="card-body">
//             <h5 className="card-title text-primary">
//               <Users size={20} className="me-2" />
//               Role
//             </h5>
//             <p className="card-text fs-5">{user?.roles?.join(", ")}</p>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-4">
//         <div className="card border-0 shadow-sm h-100">
//           <div className="card-body">
//             <h5 className="card-title text-primary">
//               <Building size={20} className="me-2" />
//               District
//             </h5>
//             <p className="card-text fs-5">{user?.district}</p>
//           </div>
//         </div>
//       </div>
//       {user?.society && (
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary">
//                 <Building size={20} className="me-2" />
//                 Society
//               </h5>
//               <p className="card-text fs-5">{user?.society}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// // ==================== Create Submission Page ====================
// const CreateSubmissionPage = ({ user }) => {
//   const [borrowers, setBorrowers] = useState([
//     {
//       id: Date.now(),
//       loanNumber: "",
//       borrowerName: "",
//       borrowerAddress: "",
//       membershipNo: "",
//       guarantor1Name: "",
//       guarantor1Address: "",
//       guarantor1MembershipNo: "",
//       guarantor2Name: "",
//       guarantor2Address: "",
//       guarantor2MembershipNo: "",
//       loanAmount: "",
//       interest: "",
//       interestRate: "",
//       stationeryFees: "",
//     },
//   ]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const addBorrower = () => {
//     setBorrowers([
//       ...borrowers,
//       {
//         id: Date.now(),
//         loanNumber: "",
//         borrowerName: "",
//         borrowerAddress: "",
//         membershipNo: "",
//         guarantor1Name: "",
//         guarantor1Address: "",
//         guarantor1MembershipNo: "",
//         guarantor2Name: "",
//         guarantor2Address: "",
//         guarantor2MembershipNo: "",
//         loanAmount: "",
//         interest: "",
//         interestRate: "",
//         stationeryFees: "",
//       },
//     ]);
//   };

//   const removeBorrower = (id) => {
//     if (borrowers.length > 1) {
//       setBorrowers(borrowers.filter((b) => b.id !== id));
//     }
//   };

//   const updateBorrower = (id, field, value) => {
//     setBorrowers(
//       borrowers.map((b) => (b.id === id ? { ...b, [field]: value } : b))
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const submissionData = {
//         districtId: user.district,
//         societyId: user.society,
//         borrowers: borrowers.map(({ id, ...b }) => b),
//       };

//       await api.createSubmission(submissionData);
//       setSuccess("Submission created successfully and sent for approval!");

//       setBorrowers([
//         {
//           id: Date.now(),
//           loanNumber: "",
//           borrowerName: "",
//           borrowerAddress: "",
//           membershipNo: "",
//           guarantor1Name: "",
//           guarantor1Address: "",
//           guarantor1MembershipNo: "",
//           guarantor2Name: "",
//           guarantor2Address: "",
//           guarantor2MembershipNo: "",
//           loanAmount: "",
//           interest: "",
//           interestRate: "",
//           stationeryFees: "",
//         },
//       ]);

//       window.scrollTo(0, 0);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="mb-4">Create New Submission</h2>
//       <div className="alert alert-info mb-4">
//         <AlertCircle size={18} className="me-2" />
//         As Society Admin, you create borrower submissions. They will be sent to
//         Society Approval Officer for review.
//       </div>

//       {error && (
//         <div className="alert alert-danger">
//           <AlertCircle size={18} className="me-2" />
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="alert alert-success">
//           <CheckCircle size={18} className="me-2" />
//           {success}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         {borrowers.map((borrower, index) => (
//           <div key={borrower.id} className="card mb-4 border-0 shadow-sm">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Borrower {index + 1}</h5>
//               {borrowers.length > 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light"
//                   onClick={() => removeBorrower(borrower.id)}
//                 >
//                   <XCircle size={16} className="me-1" />
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="card-body">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Loan Number (ණය අංකය) *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.loanNumber}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanNumber", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">
//                     Borrower Name (ණය ගැනුම්කරුගේ නම) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.borrowerName}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerName",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">
//                     Borrower Address (ලිපිනය) *
//                   </label>
//                   <textarea
//                     className="form-control"
//                     rows="2"
//                     value={borrower.borrowerAddress}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerAddress",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Membership No *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.membershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "membershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">
//                     Guarantor 1 Name (ඇපකරු 1) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Guarantor 1 Membership *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">
//                     Guarantor 2 Name (ඇපකරු 2) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Guarantor 2 Membership *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Loan Amount (ණය මුදල) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.loanAmount}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanAmount", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Interest (පොළිය) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interest}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "interest", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Interest Rate (%) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interestRate}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "interestRate",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Stationery Fees *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.stationeryFees}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "stationeryFees",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="d-flex gap-2">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={addBorrower}
//           >
//             <FileText size={18} className="me-1" />
//             Add Another Borrower
//           </button>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <CheckCircle size={18} className="me-1" />
//                 Submit for Society Approval
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // ==================== My Submissions Page ====================
// const MySubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">My Submissions</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           No submissions found
//         </div>
//       ) : (
//         <div className="card border-0 shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Date</th>
//                   <th>Borrowers</th>
//                   <th>Status</th>
//                   <th>Submitted By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((s) => (
//                   <tr key={s.id}>
//                     <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {s.borrowers.length} borrowers
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`badge bg-${
//                           s.status === "approved"
//                             ? "success"
//                             : s.status === "rejected"
//                             ? "danger"
//                             : "warning"
//                         }`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td>{s.submittedBy}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <FileText size={16} className="me-1" />
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Pending Approvals Page ====================
// const PendingApprovalsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   useEffect(() => {
//     loadPendingSubmissions();
//   }, []);

//   const loadPendingSubmissions = async () => {
//     try {
//       const data = await api.getPendingApprovalsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to approve this submission? It will be sent to District Office."
//       )
//     )
//       return;

//     setActionLoading(true);
//     try {
//       await api.approveSubmission(id);
//       alert("Submission approved and sent to District Office successfully!");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async (id) => {
//     const reason = window.prompt("Enter rejection reason:");
//     if (!reason) return;

//     setActionLoading(true);
//     try {
//       await api.rejectSubmission(id, reason);
//       alert("Submission rejected");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Pending Approvals</h2>
//       <div className="alert alert-info mb-4">
//         <Clock size={18} className="me-2" />
//         Review and approve submissions created by Society Admin. Approved
//         submissions will be sent to District Office.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-warning">
//           <Clock size={18} className="me-2" />
//           No pending approvals
//         </div>
//       ) : (
//         <div className="row">
//           {submissions.map((s) => (
//             <div key={s.id} className="col-12 mb-3">
//               <div className="card border-0 shadow-sm">
//                 <div className="card-header bg-warning bg-opacity-10">
//                   <h5 className="mb-0">
//                     <Clock size={20} className="me-2" />
//                     Submission from{" "}
//                     {new Date(s.submittedDate).toLocaleDateString()}
//                   </h5>
//                 </div>
//                 <div className="card-body">
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <strong>Borrowers:</strong> {s.borrowers.length}
//                     </div>
//                     <div className="col-md-6">
//                       <strong>Submitted by:</strong> {s.submittedBy}
//                     </div>
//                   </div>

//                   <div className="table-responsive mb-3">
//                     <table className="table table-sm table-bordered">
//                       <thead className="table-light">
//                         <tr>
//                           <th>Borrower Name</th>
//                           <th>Loan No</th>
//                           <th>Amount</th>
//                           <th>Interest</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {s.borrowers.map((b, idx) => (
//                           <tr key={idx}>
//                             <td>{b.borrowerName}</td>
//                             <td>{b.loanNumber}</td>
//                             <td>Rs. {b.loanAmount}</td>
//                             <td>Rs. {b.interest}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleApprove(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <CheckCircle size={18} className="me-1" />
//                       Approve & Send to District
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleReject(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <XCircle size={18} className="me-1" />
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Approved Submissions Page ====================
// const ApprovedSubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadApprovedSubmissions();
//   }, []);

//   const loadApprovedSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       const approved = data.filter((s) => s.status === "approved");
//       setSubmissions(approved);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Approved Submissions</h2>
//       <div className="alert alert-success mb-4">
//         <CheckCircle size={18} className="me-2" />
//         These submissions have been approved and sent to District Office for
//         processing.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           No approved submissions yet
//         </div>
//       ) : (
//         <div className="card border-0 shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Submission Date</th>
//                   <th>Borrowers</th>
//                   <th>Submitted By</th>
//                   <th>Approved Date</th>
//                   <th>Approved By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((s) => (
//                   <tr key={s.id}>
//                     <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {s.borrowers.length} borrowers
//                       </span>
//                     </td>
//                     <td>{s.submittedBy}</td>
//                     <td>
//                       {s.approvedDate
//                         ? new Date(s.approvedDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td>{s.approvedBy || "-"}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <FileText size={16} className="me-1" />
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== District Submissions Page ====================
// const DistrictSubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedBorrower, setExpandedBorrower] = useState(null);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDecisionModal, setShowDecisionModal] = useState(false);
//   const [showDecisionDetailsModal, setShowDecisionDetailsModal] =
//     useState(false);
//   const [viewDecisionDetails, setViewDecisionDetails] = useState(null);
//   const [decisionData, setDecisionData] = useState({
//     decisionDate: "",
//     finalLoanAmount: "",
//     interestDeducted: "",
//     arbitrationDecision: "",
//   });

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getApprovedSubmissionsByDistrict(user.district);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkFeePaid = async (submissionId, borrowerId) => {
//     if (
//       !window.confirm(
//         "මෙම බේරුම් ගාස්තුව ගෙවා ඇත ලෙස සලකුණු කරන්නද? මෙය බේරුම් අංකයක් සහ නිලධාරියෙකු පවරනු ඇත."
//       )
//     )
//       return;

//     try {
//       await api.updateArbitrationFee(submissionId, borrowerId, true);
//       alert(
//         "බේරුම් ගාස්තුව ගෙවා ඇත ලෙස සලකුණු කර ඇත. බේරුම් අංකය සහ නිලධාරියා පවරා ඇත!"
//       );
//       loadSubmissions();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAddDecision = (submission, borrower) => {
//     setSelectedBorrower({ submission, borrower });
//     setShowDecisionModal(true);
//     setDecisionData({
//       decisionDate: new Date().toISOString().split("T")[0],
//       finalLoanAmount: borrower.loanAmount || "",
//       interestDeducted: "",
//       arbitrationDecision: "",
//     });
//   };

//   const openDecisionDetailsModal = (borrower) => {
//     setViewDecisionDetails(borrower);
//     setShowDecisionDetailsModal(true);
//   };

//   const submitDecision = async () => {
//     if (
//       !decisionData.decisionDate ||
//       !decisionData.finalLoanAmount ||
//       !decisionData.interestDeducted ||
//       !decisionData.arbitrationDecision
//     ) {
//       alert("කරුණාකර සියලු තොරතුරු පුරවන්න");
//       return;
//     }

//     try {
//       await api.addArbitrationDecision(
//         selectedBorrower.submission.id,
//         selectedBorrower.borrower.id,
//         decisionData
//       );
//       alert("තීරණය සාර්ථකව එකතු කරන ලදී!");
//       setShowDecisionModal(false);
//       loadSubmissions();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">ජිල්ලා කාර්යාලයට ඉදිරිපත් කිරීම්</h2>
//       <div className="alert alert-success mb-4">
//         <CheckCircle size={18} className="me-2" />
//         මෙම ඉදිරිපත් කිරීම් සමිති විසින් අනුමත කර ඇති අතර ජිල්ලා කාර්යාල සැකසීම
//         සඳහා සූදානම්ය.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           සමිතිවලින් තවමත් අනුමත කළ ඉදිරිපත් කිරීම් නොමැත
//         </div>
//       ) : (
//         submissions.map((submission) => (
//           <div key={submission.id} className="card mb-4 shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0">
//                 <Building size={18} className="me-2" />
//                 {submission.societyName || "Society"}
//               </h5>
//               <small>
//                 අනුමත කළ දිනය:{" "}
//                 {new Date(
//                   submission.approvedDate || submission.submittedDate
//                 ).toLocaleDateString("si-LK")}
//               </small>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>ණය අංකය</th>
//                       <th>නම</th>
//                       <th>ලිපිනය</th>
//                       <th>ණය මුදල</th>
//                       <th>පොලිය</th>
//                       <th>බේරුම් ගාස්තු</th>
//                       <th>බේරුම් අංකය</th>
//                       <th>බේරුම්කරු</th>
//                       <th>තීරණය</th>
//                       <th>විස්තර</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submission.borrowers.map((borrower) => (
//                       <React.Fragment key={borrower.id}>
//                         <tr>
//                           <td>{borrower.loanNumber}</td>
//                           <td>
//                             <strong>{borrower.borrowerName}</strong>
//                           </td>
//                           <td>{borrower.borrowerAddress}</td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(borrower.loanAmount).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(borrower.interest).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td className="text-center">
//                             {borrower.arbitrationFeePaid ? (
//                               <span className="badge bg-success">ගෙවා ඇත</span>
//                             ) : (
//                               <div className="btn-group btn-group-sm">
//                                 <button
//                                   onClick={() =>
//                                     handleMarkFeePaid(
//                                       submission.id,
//                                       borrower.id
//                                     )
//                                   }
//                                   className="btn btn-success"
//                                 >
//                                   ගෙවා ඇත
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                           <td className="fw-bold text-primary">
//                             {borrower.arbitrationNumber || "-"}
//                           </td>
//                           <td>
//                             {borrower.assignedOfficer ||
//                               borrower.assignedOfficerName ||
//                               "-"}
//                           </td>
//                           <td className="text-center">
//                             {borrower.status === "assigned" &&
//                               !borrower.arbitrationDecision && (
//                                 <button
//                                   onClick={() =>
//                                     handleAddDecision(submission, borrower)
//                                   }
//                                   className="btn btn-info btn-sm"
//                                 >
//                                   තීරණය එකතු කරන්න
//                                 </button>
//                               )}
//                             {borrower.arbitrationDecision && (
//                               <button
//                                 onClick={() =>
//                                   openDecisionDetailsModal(borrower)
//                                 }
//                                 className="btn btn-success btn-sm"
//                               >
//                                 <CheckCircle size={14} className="me-1" />
//                                 තීරණය බලන්න
//                               </button>
//                             )}
//                             {borrower.status === "pending" && "-"}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() =>
//                                 setExpandedBorrower(
//                                   expandedBorrower === borrower.id
//                                     ? null
//                                     : borrower.id
//                                 )
//                               }
//                               className="btn btn-info btn-sm"
//                             >
//                               <FileText size={14} className="me-1" />
//                               විස්තර
//                             </button>
//                           </td>
//                         </tr>
//                         {expandedBorrower === borrower.id && (
//                           <tr>
//                             <td colSpan="10" className="bg-light">
//                               <div className="row g-3 p-3">
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-primary border-bottom pb-2">
//                                         ණයගැතියාගේ සම්පූර්ණ තොරතුරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.borrowerName}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.borrowerAddress}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.membershipNo}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>ණය අංකය:</strong>{" "}
//                                         {borrower.loanNumber}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-success border-bottom pb-2">
//                                         ණය විස්තර
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>ණය මුදල:</strong> රු.{" "}
//                                         {parseFloat(
//                                           borrower.loanAmount
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>පොලිය:</strong> රු.{" "}
//                                         {parseFloat(
//                                           borrower.interest
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>පොලී අනුපාතය:</strong>{" "}
//                                         {borrower.interestRate}%
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>ලිපි ද්‍රව්‍ය ගාස්තු:</strong>{" "}
//                                         රු.{" "}
//                                         {parseFloat(
//                                           borrower.stationeryFees || 0
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-info border-bottom pb-2">
//                                         පළමු ඇපකරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.guarantor1Name}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.guarantor1Address}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.guarantor1MembershipNo}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-info border-bottom pb-2">
//                                         දෙවන ඇපකරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.guarantor2Name}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.guarantor2Address}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.guarantor2MembershipNo}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Decision Modal */}
//       {showDecisionModal && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <CheckCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණය එකතු කරන්න
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <Calendar size={16} className="me-2 text-primary" />
//                         ණය ලබා දුන් අවසාන දිනය *
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control form-control-lg"
//                         value={decisionData.decisionDate}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             decisionDate: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <DollarSign size={16} className="me-2 text-success" />
//                         ලැබුණු ණය මුදල (රු.) *
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control form-control-lg"
//                         placeholder="0.00"
//                         value={decisionData.finalLoanAmount}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             finalLoanAmount: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <Percent size={16} className="me-2 text-warning" />
//                         අඩු කළ පොලිය (රු.) *
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control form-control-lg"
//                         placeholder="0.00"
//                         value={decisionData.interestDeducted}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             interestDeducted: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-12">
//                       <label className="form-label fw-bold">
//                         <FileText size={16} className="me-2 text-info" />
//                         බේරුම්කරුගේ තීරණය / සටහන් *
//                       </label>
//                       <textarea
//                         className="form-control form-control-lg"
//                         rows="4"
//                         placeholder="තීරණය හෝ සටහන් මෙහි ඇතුළත් කරන්න..."
//                         value={decisionData.arbitrationDecision}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             arbitrationDecision: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div
//                     className="alert alert-info mt-4 mb-0"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <AlertCircle size={16} className="me-2" />
//                     <small>
//                       සියලු තාරකා (*) සලකුණු කළ ක්ෂේත්‍ර පුරවීම අනිවාර්ය වේ
//                     </small>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-secondary btn-lg px-4"
//                     onClick={() => setShowDecisionModal(false)}
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     අවලංගු කරන්න
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-4"
//                     onClick={submitDecision}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <CheckCircle size={16} className="me-2" />
//                     තීරණය සුරකින්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Decision Details Modal */}
//       {showDecisionDetailsModal && viewDecisionDetails && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//             onClick={() => setShowDecisionDetailsModal(false)}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <AlertCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණයේ සම්පූර්ණ විස්තර
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-12">
//                       <div className="card border-primary">
//                         <div className="card-header bg-primary text-white">
//                           <h6 className="mb-0">
//                             <Users size={16} className="me-2" />
//                             ණයගැතියාගේ තොරතුරු
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>නම:</strong>{" "}
//                                 {viewDecisionDetails.borrowerName}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>ණය අංකය:</strong>{" "}
//                                 {viewDecisionDetails.loanNumber}
//                               </p>
//                               <p className="mb-0">
//                                 <strong>බේරුම් අංකය:</strong>{" "}
//                                 <span className="text-primary fw-bold">
//                                   {viewDecisionDetails.arbitrationNumber}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>ලිපිනය:</strong>{" "}
//                                 {viewDecisionDetails.borrowerAddress}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>බේරුම්කරු:</strong>{" "}
//                                 {viewDecisionDetails.assignedOfficer}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-success">
//                         <div className="card-header bg-success text-white">
//                           <h6 className="mb-0">
//                             <DollarSign size={16} className="me-2" />
//                             මුල් ණය විස්තර
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>ණය මුදල:</strong>
//                                 <br />
//                                 <span className="text-success fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.loanAmount
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>පොලිය:</strong>
//                                 <br />
//                                 <span className="text-warning fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.interest
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-0">
//                                 <strong>පොලී අනුපාතය:</strong>
//                                 <br />
//                                 <span className="text-info fs-5">
//                                   {viewDecisionDetails.interestRate}%
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-info">
//                         <div className="card-header bg-info text-white">
//                           <h6 className="mb-0">
//                             <CheckCircle size={16} className="me-2" />
//                             බේරුම්කරු තීරණය
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row mb-3">
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ණය ලබා දුන් අවසාන දිනය
//                               </label>
//                               <p className="fw-bold">
//                                 {viewDecisionDetails.decisionDate
//                                   ? new Date(
//                                       viewDecisionDetails.decisionDate
//                                     ).toLocaleDateString("si-LK")
//                                   : "-"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ලැබුණු ණය මුදල
//                               </label>
//                               <p className="fw-bold text-success fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.finalLoanAmount
//                                   ? parseFloat(
//                                       viewDecisionDetails.finalLoanAmount
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 අඩු කළ පොලිය
//                               </label>
//                               <p className="fw-bold text-danger fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.interestDeducted
//                                   ? parseFloat(
//                                       viewDecisionDetails.interestDeducted
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                           </div>
//                           <div
//                             className="alert alert-light border"
//                             style={{ borderRadius: "10px" }}
//                           >
//                             <label className="text-muted small mb-2">
//                               තීරණය / සටහන්
//                             </label>
//                             <p
//                               className="mb-0"
//                               style={{ whiteSpace: "pre-wrap" }}
//                             >
//                               {viewDecisionDetails.arbitrationDecision || "-"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-5"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     වසන්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ==================== Provincial Overview Page ====================
// const ProvincialOverviewPage = ({ user }) => {
//   const [allSubmissions, setAllSubmissions] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedDistrict, setExpandedDistrict] = useState(null);
//   const [showDecisionDetailsModal, setShowDecisionDetailsModal] =
//     useState(false);
//   const [viewDecisionDetails, setViewDecisionDetails] = useState(null);

//   useEffect(() => {
//     loadProvincialData();
//   }, []);

//   const loadProvincialData = async () => {
//     try {
//       const [districtsData, submissionsData] = await Promise.all([
//         api.getDistricts(),
//         // For provincial admin, we need to fetch submissions from all districts
//         Promise.resolve([]), // This would be replaced with actual API call to get all submissions
//       ]);
//       setDistricts(districtsData);
//       setAllSubmissions(submissionsData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDecisionDetailsModal = (borrower) => {
//     setViewDecisionDetails(borrower);
//     setShowDecisionDetailsModal(true);
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">පළාත් කාර්යාල පාලන පුවරුව</h2>
//       <p className="text-muted mb-4">
//         මධ්‍ය පළාතේ සියලුම දිස්ත්‍රික්ක වල තොරතුරු
//       </p>

//       {districts.map((district) => {
//         const districtSubmissions = allSubmissions.filter(
//           (s) => s.district === district.id
//         );
//         const totalBorrowers = districtSubmissions.reduce(
//           (sum, sub) => sum + sub.borrowers.length,
//           0
//         );
//         const completedDecisions = districtSubmissions
//           .flatMap((s) => s.borrowers)
//           .filter((b) => b.status === "decision-given").length;
//         const pendingCount = districtSubmissions
//           .flatMap((s) => s.borrowers)
//           .filter((b) => b.status === "pending").length;

//         return (
//           <div key={district.id} className="card mb-4 border-primary shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h4 className="mb-0">
//                   <Building size={20} className="me-2" />
//                   {district.name} දිස්ත්‍රික්කය
//                 </h4>
//                 <button
//                   className="btn btn-light btn-sm"
//                   onClick={() =>
//                     setExpandedDistrict(
//                       expandedDistrict === district.id ? null : district.id
//                     )
//                   }
//                 >
//                   {expandedDistrict === district.id
//                     ? "Hide Details"
//                     : "View Details"}
//                 </button>
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="row mb-3">
//                 <div className="col-md-3">
//                   <div className="card bg-info text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <FileText size={20} />
//                       </h5>
//                       <h6 className="mb-1">ඉදිරිපත් කිරීම්</h6>
//                       <h2 className="mb-0">{districtSubmissions.length}</h2>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="card bg-warning text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <Users size={20} />
//                       </h5>
//                       <h6 className="mb-1">ණයගැතියන්</h6>
//                       <h2 className="mb-0">{totalBorrowers}</h2>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="card bg-success text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <CheckCircle size={20} />
//                       </h5>
//                       <h6 className="mb-1">සම්පූර්ණ තීරණ</h6>
//                       <h2 className="mb-0">{completedDecisions}</h2>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="card bg-danger text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <Clock size={20} />
//                       </h5>
//                       <h6 className="mb-1">අනුමැතියට</h6>
//                       <h2 className="mb-0">{pendingCount}</h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {expandedDistrict === district.id &&
//                 districtSubmissions.length > 0 && (
//                   <div className="mt-4">
//                     {districtSubmissions.map((submission) => (
//                       <div
//                         key={submission.id}
//                         className="card mb-3 border-secondary"
//                       >
//                         <div className="card-header bg-light">
//                           <h6 className="mb-0">
//                             <Building size={16} className="me-2" />
//                             {submission.societyName || "Society"}
//                           </h6>
//                           <small className="text-muted">
//                             අනුමත කළ දිනය:{" "}
//                             {submission.approvedDate
//                               ? new Date(
//                                   submission.approvedDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </small>
//                         </div>
//                         <div className="card-body">
//                           <div className="table-responsive">
//                             <table className="table table-sm table-bordered mb-0">
//                               <thead className="table-light">
//                                 <tr>
//                                   <th>ණය අංකය</th>
//                                   <th>ණයගැතියා</th>
//                                   <th>ණය මුදල</th>
//                                   <th>බේරුම් අංකය</th>
//                                   <th>බේරුම්කරු</th>
//                                   <th>තත්වය</th>
//                                   <th>තීරණය</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {submission.borrowers.map((borrower) => (
//                                   <tr key={borrower.id}>
//                                     <td>{borrower.loanNumber}</td>
//                                     <td>{borrower.borrowerName}</td>
//                                     <td>
//                                       රු.{" "}
//                                       {parseFloat(
//                                         borrower.loanAmount
//                                       ).toLocaleString("si-LK")}
//                                     </td>
//                                     <td>{borrower.arbitrationNumber || "-"}</td>
//                                     <td>{borrower.assignedOfficer || "-"}</td>
//                                     <td>
//                                       {borrower.status === "pending" && (
//                                         <span className="badge bg-warning">
//                                           අනුමැතියට
//                                         </span>
//                                       )}
//                                       {borrower.status === "assigned" && (
//                                         <span className="badge bg-info">
//                                           පවරා ඇත
//                                         </span>
//                                       )}
//                                       {borrower.status === "decision-given" && (
//                                         <span className="badge bg-success">
//                                           තීරණය ලබා දී ඇත
//                                         </span>
//                                       )}
//                                     </td>
//                                     <td className="text-center">
//                                       {borrower.arbitrationDecision ? (
//                                         <button
//                                           onClick={() =>
//                                             openDecisionDetailsModal(borrower)
//                                           }
//                                           className="btn btn-info btn-sm"
//                                         >
//                                           <FileText
//                                             size={14}
//                                             className="me-1"
//                                           />
//                                           තීරණය බලන්න
//                                         </button>
//                                       ) : borrower.status === "assigned" ? (
//                                         <span className="badge bg-warning">
//                                           බලා සිටින්න
//                                         </span>
//                                       ) : (
//                                         "-"
//                                       )}
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               {expandedDistrict === district.id &&
//                 districtSubmissions.length === 0 && (
//                   <div className="alert alert-info mt-3">
//                     <AlertCircle size={16} className="me-2" />
//                     මෙම දිස්ත්‍රික්කයේ තවමත් ඉදිරිපත් කිරීම් නොමැත
//                   </div>
//                 )}
//             </div>
//           </div>
//         );
//       })}

//       {/* Decision Details Modal */}
//       {showDecisionDetailsModal && viewDecisionDetails && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//             onClick={() => setShowDecisionDetailsModal(false)}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <AlertCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණයේ සම්පූර්ණ විස්තර
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-12">
//                       <div className="card border-primary">
//                         <div className="card-header bg-primary text-white">
//                           <h6 className="mb-0">
//                             <Users size={16} className="me-2" />
//                             ණයගැතියාගේ තොරතුරු
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>නම:</strong>{" "}
//                                 {viewDecisionDetails.borrowerName}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>ණය අංකය:</strong>{" "}
//                                 {viewDecisionDetails.loanNumber}
//                               </p>
//                               <p className="mb-0">
//                                 <strong>බේරුම් අංකය:</strong>{" "}
//                                 <span className="text-primary fw-bold">
//                                   {viewDecisionDetails.arbitrationNumber}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>ලිපිනය:</strong>{" "}
//                                 {viewDecisionDetails.borrowerAddress}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>බේරුම්කරු:</strong>{" "}
//                                 {viewDecisionDetails.assignedOfficer}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-success">
//                         <div className="card-header bg-success text-white">
//                           <h6 className="mb-0">
//                             <DollarSign size={16} className="me-2" />
//                             මුල් ණය විස්තර
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>ණය මුදල:</strong>
//                                 <br />
//                                 <span className="text-success fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.loanAmount
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>පොලිය:</strong>
//                                 <br />
//                                 <span className="text-warning fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.interest
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-0">
//                                 <strong>පොලී අනුපාතය:</strong>
//                                 <br />
//                                 <span className="text-info fs-5">
//                                   {viewDecisionDetails.interestRate}%
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-info">
//                         <div className="card-header bg-info text-white">
//                           <h6 className="mb-0">
//                             <CheckCircle size={16} className="me-2" />
//                             බේරුම්කරු තීරණය
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row mb-3">
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ණය ලබා දුන් අවසාන දිනය
//                               </label>
//                               <p className="fw-bold">
//                                 {viewDecisionDetails.decisionDate
//                                   ? new Date(
//                                       viewDecisionDetails.decisionDate
//                                     ).toLocaleDateString("si-LK")
//                                   : "-"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ලැබුණු ණය මුදල
//                               </label>
//                               <p className="fw-bold text-success fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.finalLoanAmount
//                                   ? parseFloat(
//                                       viewDecisionDetails.finalLoanAmount
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 අඩු කළ පොලිය
//                               </label>
//                               <p className="fw-bold text-danger fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.interestDeducted
//                                   ? parseFloat(
//                                       viewDecisionDetails.interestDeducted
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                           </div>
//                           <div
//                             className="alert alert-light border"
//                             style={{ borderRadius: "10px" }}
//                           >
//                             <label className="text-muted small mb-2">
//                               තීරණය / සටහන්
//                             </label>
//                             <p
//                               className="mb-0"
//                               style={{ whiteSpace: "pre-wrap" }}
//                             >
//                               {viewDecisionDetails.arbitrationDecision || "-"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-5"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     වසන්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ==================== Manage Societies Page ====================
// const ManageSocietiesPage = ({ user }) => {
//   const [societies, setSocieties] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district,
//     registrationNo: "",
//     registeredAddress: "",
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [societiesData, districtsData] = await Promise.all([
//         api.getSocietiesByDistrict(user.district),
//         api.getDistricts(),
//       ]);
//       setSocieties(societiesData);
//       setDistricts(districtsData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createSociety(formData);
//       alert("Society created successfully!");
//       setShowModal(false);
//       setFormData({
//         name: "",
//         districtId: user.district,
//         registrationNo: "",
//         registeredAddress: "",
//       });
//       loadData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Societies</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Building size={18} className="me-1" />
//           Add Society
//         </button>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Society Name</th>
//                 <th>Registration No</th>
//                 <th>Address</th>
//                 <th>Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {societies.map((s) => (
//                 <tr key={s.id}>
//                   <td>
//                     <strong>{s.name}</strong>
//                   </td>
//                   <td>{s.registrationNo}</td>
//                   <td>{s.registeredAddress}</td>
//                   <td>{new Date(s.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Society</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Society Name (සමිති නම) *
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">District *</label>
//                     <select
//                       className="form-select"
//                       value={formData.districtId}
//                       onChange={(e) =>
//                         setFormData({ ...formData, districtId: e.target.value })
//                       }
//                       required
//                     >
//                       {districts.map((d) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Registration No</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.registrationNo}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registrationNo: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Registered Address (ලියාපදිංචි ලිපිනය)
//                     </label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       value={formData.registeredAddress}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registeredAddress: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Society
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Manage Officers Page ====================
// const ManageOfficersPage = ({ user }) => {
//   const [officers, setOfficers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadOfficers();
//   }, []);

//   const loadOfficers = async () => {
//     try {
//       const data = await api.getOfficersByDistrict(user.district);
//       setOfficers(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createOfficer(formData);
//       alert("Officer created successfully!");
//       setShowModal(false);
//       setFormData({ name: "", districtId: user.district });
//       loadOfficers();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Arbitration Officers</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Users size={18} className="me-1" />
//           Add Officer
//         </button>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Officer Name</th>
//                 <th>District</th>
//                 <th>Status</th>
//                 <th>Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {officers.map((o) => (
//                 <tr key={o.id}>
//                   <td>
//                     <strong>{o.name}</strong>
//                   </td>
//                   <td>{o.districtId}</td>
//                   <td>
//                     {o.assignedToSocietyId ? (
//                       <span className="badge bg-warning">Assigned</span>
//                     ) : (
//                       <span className="badge bg-success">Available</span>
//                     )}
//                   </td>
//                   <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Officer</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Officer Name (නිලධාරීගේ නම) *
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Officer
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Main App Component ====================
// const App = () => {
//   const { user, loading } = useAuth();
//   const [showSignup, setShowSignup] = useState(false);

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//         />
//       </div>
//     );
//   }

//   if (!user) {
//     return showSignup ? (
//       <SignupPage onBackToLogin={() => setShowSignup(false)} />
//     ) : (
//       <LoginPage onShowSignup={() => setShowSignup(true)} />
//     );
//   }

//   return <Dashboard />;
// };

// // ==================== Root Component ====================
// const Root = () => (
//   <AuthProvider>
//     <link
//       href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//       rel="stylesheet"
//     />
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
//     <App />
//   </AuthProvider>
// );

// export default Root;

// import React, { useState, useEffect, createContext, useContext } from "react";
// import {
//   Camera,
//   FileText,
//   Users,
//   Building,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Home,
//   LogOut,
//   Menu,
//   Calendar,
//   DollarSign,
//   Percent,
//   ArrowLeft,
// } from "lucide-react";

// // ==================== Context ====================
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = () => {
//       const storedUser = localStorage.getItem("user");
//       const token = localStorage.getItem("token");

//       if (storedUser && token) {
//         try {
//           setUser(JSON.parse(storedUser));
//         } catch (e) {
//           localStorage.clear();
//         }
//       }
//       setLoading(false);
//     };
//     checkSession();
//   }, []);

//   const login = (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// // ==================== API Service ====================
// const API_BASE_URL = "http://localhost:8080/api";

// const api = {
//   async request(endpoint, options = {}) {
//     const token = localStorage.getItem("token");
//     const headers = {
//       "Content-Type": "application/json",
//       ...options.headers,
//     };

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         ...options,
//         headers,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Request failed");
//       }

//       return response.json();
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   },

//   // Authentication
//   login: (data) =>
//     api.request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
//   signup: (data) =>
//     api.request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),

//   // Districts
//   getDistricts: () => api.request("/districts"),

//   // Societies
//   getSocieties: () => api.request("/societies"),
//   getSocietiesByDistrict: (districtId) => {
//     const headers = { "Content-Type": "application/json" };
//     return fetch(`${API_BASE_URL}/societies/district/${districtId}`, {
//       headers,
//     })
//       .then((res) => {
//         if (!res.ok) {
//           return fetch(`${API_BASE_URL}/societies/district/${districtId}`).then(
//             (r) => r.json()
//           );
//         }
//         return res.json();
//       })
//       .catch(() => []);
//   },
//   createSociety: (data) =>
//     api.request("/societies", { method: "POST", body: JSON.stringify(data) }),

//   // Officers
//   getOfficersByDistrict: (districtId) =>
//     api.request(`/officers/district/${districtId}`),

//   // NEW: Get officers available for registration (without user accounts)
//   getAvailableOfficersForRegistration: (districtId) => {
//     // No authentication needed for registration endpoint
//     const headers = { "Content-Type": "application/json" };
//     return fetch(
//       `${API_BASE_URL}/officers/district/${districtId}/available-for-registration`,
//       { headers }
//     )
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error("Failed to fetch available officers");
//         }
//         return res.json();
//       })
//       .catch((error) => {
//         console.error("Error fetching available officers:", error);
//         return [];
//       });
//   },

//   createOfficer: (data) =>
//     api.request("/officers", { method: "POST", body: JSON.stringify(data) }),

//   // Submissions
//   createSubmission: (data) =>
//     api.request("/submissions", { method: "POST", body: JSON.stringify(data) }),
//   approveSubmission: (id) =>
//     api.request(`/submissions/${id}/approve`, { method: "PUT" }),
//   rejectSubmission: (id, reason) =>
//     api.request(`/submissions/${id}/reject`, {
//       method: "PUT",
//       body: JSON.stringify({ reason }),
//     }),
//   getSubmissionsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}`),
//   getPendingApprovalsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}/pending`),
//   getApprovedSubmissionsByDistrict: (districtId) =>
//     api.request(`/submissions/district/${districtId}/approved`),
//   updateArbitrationFee: (submissionId, borrowerId, isPaid) =>
//     api.request(`/submissions/${submissionId}/borrowers/${borrowerId}/fee`, {
//       method: "PUT",
//       body: JSON.stringify({ isPaid }),
//     }),
//   addArbitrationDecision: (submissionId, borrowerId, data) =>
//     api.request(
//       `/submissions/${submissionId}/borrowers/${borrowerId}/decision`,
//       { method: "PUT", body: JSON.stringify(data) }
//     ),
// };

// // ==================== Login Component ====================
// const LoginPage = ({ onShowSignup }) => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await api.login(formData);
//       login(response, response.token);
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-5">
//                 <div className="text-center mb-4">
//                   <h2 className="fw-bold text-primary">ඍණ අය කිරීමේ පද්ධතිය</h2>
//                   <p className="text-muted">
//                     Central Province Debt Collection System
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="alert alert-danger" role="alert">
//                     <AlertCircle size={18} className="me-2" />
//                     {error}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label">Email Address</label>
//                     <input
//                       type="email"
//                       className="form-control form-control-lg"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control form-control-lg"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                       }
//                       placeholder="Enter your password"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-100"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Logging in...
//                       </>
//                     ) : (
//                       "Login"
//                     )}
//                   </button>
//                 </form>

//                 <hr className="my-4" />

//                 <div className="text-center">
//                   <p className="text-muted mb-0">Don't have an account?</p>
//                   <button
//                     className="btn btn-link text-decoration-none"
//                     onClick={onShowSignup}
//                   >
//                     Register Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // // ==================== Dashboard Layout ====================
// const DashboardLayout = ({ sidebar, content }) => {
//   const { user, logout } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <nav className="navbar navbar-dark bg-primary shadow-sm">
//         <div className="container-fluid">
//           <button
//             className="btn btn-link text-white d-md-none"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu size={24} />
//           </button>
//           <span className="navbar-brand mb-0 h1">ඍණ අය කිරීමේ පද්ධතිය</span>
//           <div className="d-flex align-items-center">
//             <span className="text-white me-3 d-none d-md-inline">
//               {user?.name}
//             </span>
//             <span className="badge bg-light text-primary me-3">
//               {user?.roles?.join(", ")}
//             </span>
//             <button className="btn btn-outline-light btn-sm" onClick={logout}>
//               <LogOut size={18} className="me-1" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="flex-grow-1 d-flex">
//         <div
//           className={`bg-white border-end ${
//             sidebarOpen ? "d-block" : "d-none"
//           } ${sidebarOpen ? "col-md-3 col-lg-2" : ""}`}
//           style={{ minHeight: "100%" }}
//         >
//           {sidebar}
//         </div>

//         <div className="flex-grow-1 p-4 bg-light">{content}</div>
//       </div>
//     </div>
//   );
// };

// // ==================== Signup Component ====================
// const SignupPage = ({ onBackToLogin }) => {
//   const [userType, setUserType] = useState("SOCIETY");
//   const [districts, setDistricts] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     district: "",
//     society: "",
//     role: "SOCIETY_ADMIN",
//     officerId: "",
//     designation: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadDistricts();
//   }, []);

//   useEffect(() => {
//     if (formData.district && userType === "SOCIETY") {
//       loadSocieties(formData.district);
//     }
//   }, [formData.district, userType]);

//   useEffect(() => {
//     if (
//       formData.district &&
//       userType === "OFFICER" &&
//       formData.role === "OFFICER"
//     ) {
//       loadAvailableOfficers(formData.district);
//     }
//   }, [formData.district, formData.role, userType]);

//   const loadDistricts = async () => {
//     try {
//       const data = await api.getDistricts();
//       setDistricts(data);
//     } catch (err) {
//       setError("Failed to load districts");
//     }
//   };

//   const loadSocieties = async (districtId) => {
//     try {
//       const data = await api.getSocietiesByDistrict(districtId);
//       setSocieties(data || []);
//       if (!data || data.length === 0) {
//         setError(
//           "No societies found for this district. Please contact admin to add societies first."
//         );
//       }
//     } catch (err) {
//       console.error("Failed to load societies:", err);
//       setSocieties([]);
//       setError("Failed to load societies. Please try again or contact admin.");
//     }
//   };

//   const loadAvailableOfficers = async (districtId) => {
//     try {
//       const data = await api.getAvailableOfficersForRegistration(districtId);
//       setOfficers(data || []);
//       if (!data || data.length === 0) {
//         setError(
//           "No available arbitration officers found for this district. Please contact admin to add officers first, or all officers may already have accounts."
//         );
//       }
//     } catch (err) {
//       console.error("Failed to load officers:", err);
//       setOfficers([]);
//       setError("Failed to load officers. Please try again or contact admin.");
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     // Validation for officer role
//     if (
//       userType === "OFFICER" &&
//       formData.role === "OFFICER" &&
//       !formData.officerId
//     ) {
//       setError("Please select your name from the arbitration officers list");
//       return;
//     }

//     // Validation for admin roles
//     if (
//       userType === "OFFICER" &&
//       (formData.role === "DISTRICT_ADMIN" ||
//         formData.role === "PROVINCIAL_ADMIN") &&
//       !formData.name
//     ) {
//       setError("Please enter your full name");
//       return;
//     }

//     setLoading(true);

//     try {
//       let signupData = {
//         email: formData.email,
//         password: formData.password,
//         district: formData.district,
//         userType: userType,
//       };

//       if (userType === "SOCIETY") {
//         signupData = {
//           ...signupData,
//           name: formData.name,
//           society: formData.society,
//           role: formData.role,
//         };
//       } else if (userType === "OFFICER") {
//         if (formData.role === "OFFICER") {
//           // For regular officers, use officerId (name will be fetched from backend)
//           signupData = {
//             ...signupData,
//             officerId: formData.officerId,
//             designation: "Arbitration Officer",
//           };
//         } else {
//           // For admins, use manually entered name
//           signupData = {
//             ...signupData,
//             name: formData.name,
//             designation:
//               formData.role === "DISTRICT_ADMIN"
//                 ? "District Administrator"
//                 : "Provincial Administrator",
//           };
//         }
//       }

//       await api.signup(signupData);
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => onBackToLogin(), 2000);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-7">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-5">
//                 <h2 className="text-center mb-4 fw-bold">
//                   Register New Account
//                 </h2>

//                 {error && (
//                   <div className="alert alert-danger">
//                     <AlertCircle size={18} className="me-2" />
//                     {error}
//                   </div>
//                 )}
//                 {success && (
//                   <div className="alert alert-success">
//                     <CheckCircle size={18} className="me-2" />
//                     {success}
//                   </div>
//                 )}

//                 <div className="btn-group w-100 mb-4" role="group">
//                   <button
//                     type="button"
//                     className={`btn ${
//                       userType === "SOCIETY"
//                         ? "btn-primary"
//                         : "btn-outline-primary"
//                     }`}
//                     onClick={() => {
//                       setUserType("SOCIETY");
//                       setFormData({
//                         ...formData,
//                         role: "SOCIETY_ADMIN",
//                         society: "",
//                         officerId: "",
//                         designation: "",
//                       });
//                       setError("");
//                     }}
//                   >
//                     <Users size={18} className="me-2" />
//                     Society Member
//                   </button>
//                   <button
//                     type="button"
//                     className={`btn ${
//                       userType === "OFFICER"
//                         ? "btn-primary"
//                         : "btn-outline-primary"
//                     }`}
//                     onClick={() => {
//                       setUserType("OFFICER");
//                       setFormData({
//                         ...formData,
//                         society: "",
//                         role: "OFFICER",
//                         officerId: "",
//                         name: "",
//                         designation: "",
//                       });
//                       setError("");
//                     }}
//                   >
//                     <Building size={18} className="me-2" />
//                     Officer/Admin
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     <div className="col-12 mb-3">
//                       <label className="form-label">
//                         District (දිස්ත්‍රික්කය) *
//                       </label>
//                       <select
//                         className="form-select"
//                         value={formData.district}
//                         onChange={(e) => {
//                           setFormData({
//                             ...formData,
//                             district: e.target.value,
//                             society: "",
//                             officerId: "",
//                           });
//                           setError("");
//                         }}
//                         required
//                       >
//                         <option value="">Select District</option>
//                         {districts.map((d) => (
//                           <option key={d.id} value={d.id}>
//                             {d.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {userType === "OFFICER" && (
//                       <div className="col-12 mb-3">
//                         <label className="form-label">Role (භූමිකාව) *</label>
//                         <select
//                           className="form-select"
//                           value={formData.role}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               role: e.target.value,
//                               officerId: "",
//                               name: "",
//                             });
//                             setError("");
//                           }}
//                           required
//                         >
//                           <option value="OFFICER">
//                             Arbitration Officer - බේරුම්කරු
//                           </option>
//                           <option value="DISTRICT_ADMIN">
//                             District Administrator - දිස්ත්‍රික් පරිපාලක
//                           </option>
//                           <option value="PROVINCIAL_ADMIN">
//                             Provincial Administrator - පළාත් පරිපාලක
//                           </option>
//                         </select>
//                         <small className="text-muted d-block mt-1">
//                           {formData.role === "OFFICER" &&
//                             "✓ Arbitration Officer: Handles arbitration case decisions"}
//                           {formData.role === "DISTRICT_ADMIN" &&
//                             "✓ District Admin: Manages district operations, societies, and officers"}
//                           {formData.role === "PROVINCIAL_ADMIN" &&
//                             "✓ Provincial Admin: Oversees all districts in the province"}
//                         </small>
//                       </div>
//                     )}

//                     {/* Officer Role - Select from dropdown */}
//                     {userType === "OFFICER" && formData.role === "OFFICER" && (
//                       <div className="col-12 mb-3">
//                         <label className="form-label">
//                           Select Your Name (ඔබේ නම තෝරන්න) *
//                         </label>
//                         <select
//                           className="form-select"
//                           value={formData.officerId}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               officerId: e.target.value,
//                             });
//                             setError("");
//                           }}
//                           required
//                           disabled={!formData.district}
//                         >
//                           <option value="">
//                             -- Select Your Name from List --
//                           </option>
//                           {officers.map((officer) => (
//                             <option key={officer.id} value={officer.id}>
//                               {officer.name}
//                             </option>
//                           ))}
//                         </select>

//                         {!formData.district && (
//                           <small className="text-info d-block mt-1">
//                             <i className="bi bi-info-circle me-1"></i>
//                             Please select a district first
//                           </small>
//                         )}

//                         {formData.district && officers.length === 0 && (
//                           <div className="alert alert-warning mt-2 mb-0 py-2">
//                             <small>
//                               <strong>No officers available.</strong>
//                               <br />
//                               Either no officers have been added for this
//                               district, or all officers already have accounts.
//                               <br />
//                               Contact your District Admin to add your name
//                               first.
//                             </small>
//                           </div>
//                         )}

//                         {formData.district && officers.length > 0 && (
//                           <small className="text-muted d-block mt-1">
//                             <i className="bi bi-check-circle me-1"></i>
//                             Your name must be added by District Admin first. If
//                             you don't see your name, contact your District
//                             Admin.
//                           </small>
//                         )}
//                       </div>
//                     )}

//                     {/* Admin Roles - Manual name entry */}
//                     {userType === "OFFICER" &&
//                       (formData.role === "DISTRICT_ADMIN" ||
//                         formData.role === "PROVINCIAL_ADMIN") && (
//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">
//                             Full Name (සම්පූර්ණ නම) *
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter your full name"
//                             value={formData.name}
//                             onChange={(e) =>
//                               setFormData({ ...formData, name: e.target.value })
//                             }
//                             required
//                           />
//                         </div>
//                       )}

//                     {/* Society users - Manual name entry */}
//                     {userType === "SOCIETY" && (
//                       <div className="col-md-6 mb-3">
//                         <label className="form-label">
//                           Full Name (සම්පූර්ණ නම) *
//                         </label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Enter your full name"
//                           value={formData.name}
//                           onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                           }
//                           required
//                         />
//                       </div>
//                     )}

//                     <div className={`col-md-6 mb-3`}>
//                       <label className="form-label">Email Address *</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="example@email.com"
//                         value={formData.email}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Password *</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Minimum 6 characters"
//                         value={formData.password}
//                         onChange={(e) =>
//                           setFormData({ ...formData, password: e.target.value })
//                         }
//                         minLength={6}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Confirm Password *</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Re-enter password"
//                         value={formData.confirmPassword}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         minLength={6}
//                         required
//                       />
//                     </div>

//                     {userType === "SOCIETY" && (
//                       <>
//                         <div className="col-12 mb-3">
//                           <label className="form-label">
//                             Society (සමිතිය) *
//                           </label>
//                           <select
//                             className="form-select"
//                             value={formData.society}
//                             onChange={(e) => {
//                               setFormData({
//                                 ...formData,
//                                 society: e.target.value,
//                               });
//                               setError("");
//                             }}
//                             required
//                             disabled={!formData.district}
//                           >
//                             <option value="">Select Society</option>
//                             {societies.map((s) => (
//                               <option key={s.id} value={s.id}>
//                                 {s.name}
//                               </option>
//                             ))}
//                           </select>
//                           {!formData.district && (
//                             <small className="text-muted">
//                               Please select a district first
//                             </small>
//                           )}
//                           {formData.district && societies.length === 0 && (
//                             <small className="text-danger d-block mt-1">
//                               No societies found. Contact admin to add societies
//                               for this district.
//                             </small>
//                           )}
//                         </div>

//                         <div className="col-12 mb-3">
//                           <label className="form-label">
//                             Society Role (සමිති භූමිකාව) *
//                           </label>
//                           <select
//                             className="form-select"
//                             value={formData.role}
//                             onChange={(e) =>
//                               setFormData({ ...formData, role: e.target.value })
//                             }
//                             required
//                           >
//                             <option value="SOCIETY_ADMIN">
//                               Society Admin - Creates Submissions (ඉදිරිපත්
//                               කිරීම් නිර්මාණය)
//                             </option>
//                             <option value="SOCIETY_APPROVAL">
//                               Society Approval - Approves Submissions (ඉදිරිපත්
//                               කිරීම් අනුමත කිරීම)
//                             </option>
//                           </select>
//                           <small className="text-muted d-block mt-1">
//                             {formData.role === "SOCIETY_ADMIN"
//                               ? "✓ Creates borrower submissions and sends for approval"
//                               : "✓ Reviews and approves/rejects submissions before sending to District Office"}
//                           </small>
//                         </div>
//                       </>
//                     )}
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-100 mt-3"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Registering...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle size={18} className="me-2" />
//                         Register Account
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 <hr className="my-4" />

//                 <div className="text-center">
//                   <button
//                     className="btn btn-link text-decoration-none"
//                     onClick={onBackToLogin}
//                   >
//                     <ArrowLeft size={16} className="me-1" />
//                     Already have an account? Login here
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== Dashboard Component ====================
// const Dashboard = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("home");

//   const isSocietyAdmin = user?.roles?.includes("SOCIETY_ADMIN");
//   const isSocietyApproval = user?.roles?.includes("SOCIETY_APPROVAL");
//   const isDistrictAdmin = user?.roles?.includes("DISTRICT_ADMIN");
//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");
//   const isAdmin = isDistrictAdmin || isProvincialAdmin;

//   const NavItem = ({ id, icon: Icon, label }) => (
//     <button
//       className={`nav-link text-start w-100 ${
//         activeTab === id ? "active bg-primary text-white" : "text-dark"
//       }`}
//       onClick={() => setActiveTab(id)}
//     >
//       <Icon size={18} className="me-2" />
//       {label}
//     </button>
//   );

//   const sidebar = (
//     <div className="p-3">
//       <nav className="nav flex-column">
//         <NavItem id="home" icon={Home} label="Home" />

//         {isSocietyAdmin && (
//           <>
//             <NavItem
//               id="create-submission"
//               icon={FileText}
//               label="Create Submission"
//             />
//             <NavItem
//               id="my-submissions"
//               icon={FileText}
//               label="My Submissions"
//             />
//           </>
//         )}

//         {isSocietyApproval && (
//           <>
//             <NavItem
//               id="pending-approvals"
//               icon={Clock}
//               label="Pending Approvals"
//             />
//             <NavItem
//               id="approved-submissions"
//               icon={CheckCircle}
//               label="Approved Submissions"
//             />
//           </>
//         )}

//         {isAdmin && (
//           <>
//             <NavItem
//               id="district-submissions"
//               icon={FileText}
//               label="District Submissions"
//             />
//             {isProvincialAdmin && (
//               <NavItem
//                 id="provincial-overview"
//                 icon={Building}
//                 label="Provincial Overview"
//               />
//             )}
//             <NavItem
//               id="manage-societies"
//               icon={Building}
//               label="Manage Societies"
//             />
//             <NavItem
//               id="manage-officers"
//               icon={Users}
//               label="Manage Officers"
//             />
//           </>
//         )}
//       </nav>
//     </div>
//   );

//   let content;
//   if (activeTab === "home") {
//     content = <HomePage user={user} />;
//   } else if (activeTab === "create-submission") {
//     content = <CreateSubmissionPage user={user} />;
//   } else if (activeTab === "my-submissions") {
//     content = <MySubmissionsPage user={user} />;
//   } else if (activeTab === "pending-approvals") {
//     content = <PendingApprovalsPage user={user} />;
//   } else if (activeTab === "approved-submissions") {
//     content = <ApprovedSubmissionsPage user={user} />;
//   } else if (activeTab === "district-submissions") {
//     content = <DistrictSubmissionsPage user={user} />;
//   } else if (activeTab === "provincial-overview") {
//     content = <ProvincialOverviewPage user={user} />;
//   } else if (activeTab === "manage-societies") {
//     content = <ManageSocietiesPage user={user} />;
//   } else if (activeTab === "manage-officers") {
//     content = <ManageOfficersPage user={user} />;
//   }

//   return <DashboardLayout sidebar={sidebar} content={content} />;
// };

// // ==================== Home Page ====================
// const HomePage = ({ user }) => (
//   <div>
//     <h2 className="mb-4">Welcome, {user?.name}!</h2>
//     <div className="row g-4">
//       <div className="col-md-4">
//         <div className="card border-0 shadow-sm h-100">
//           <div className="card-body">
//             <h5 className="card-title text-primary">
//               <Users size={20} className="me-2" />
//               Role
//             </h5>
//             <p className="card-text fs-5">{user?.roles?.join(", ")}</p>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-4">
//         <div className="card border-0 shadow-sm h-100">
//           <div className="card-body">
//             <h5 className="card-title text-primary">
//               <Building size={20} className="me-2" />
//               District
//             </h5>
//             <p className="card-text fs-5">{user?.district}</p>
//           </div>
//         </div>
//       </div>
//       {user?.society && (
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary">
//                 <Building size={20} className="me-2" />
//                 Society
//               </h5>
//               <p className="card-text fs-5">{user?.society}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// // ==================== Create Submission Page ====================
// const CreateSubmissionPage = ({ user }) => {
//   const [borrowers, setBorrowers] = useState([
//     {
//       id: Date.now(),
//       loanNumber: "",
//       borrowerName: "",
//       borrowerAddress: "",
//       membershipNo: "",
//       guarantor1Name: "",
//       guarantor1Address: "",
//       guarantor1MembershipNo: "",
//       guarantor2Name: "",
//       guarantor2Address: "",
//       guarantor2MembershipNo: "",
//       loanAmount: "",
//       interest: "",
//       interestRate: "",
//       stationeryFees: "",
//     },
//   ]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const addBorrower = () => {
//     setBorrowers([
//       ...borrowers,
//       {
//         id: Date.now(),
//         loanNumber: "",
//         borrowerName: "",
//         borrowerAddress: "",
//         membershipNo: "",
//         guarantor1Name: "",
//         guarantor1Address: "",
//         guarantor1MembershipNo: "",
//         guarantor2Name: "",
//         guarantor2Address: "",
//         guarantor2MembershipNo: "",
//         loanAmount: "",
//         interest: "",
//         interestRate: "",
//         stationeryFees: "",
//       },
//     ]);
//   };

//   const removeBorrower = (id) => {
//     if (borrowers.length > 1) {
//       setBorrowers(borrowers.filter((b) => b.id !== id));
//     }
//   };

//   const updateBorrower = (id, field, value) => {
//     setBorrowers(
//       borrowers.map((b) => (b.id === id ? { ...b, [field]: value } : b))
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const submissionData = {
//         districtId: user.district,
//         societyId: user.society,
//         borrowers: borrowers.map(({ id, ...b }) => b),
//       };

//       await api.createSubmission(submissionData);
//       setSuccess("Submission created successfully and sent for approval!");

//       setBorrowers([
//         {
//           id: Date.now(),
//           loanNumber: "",
//           borrowerName: "",
//           borrowerAddress: "",
//           membershipNo: "",
//           guarantor1Name: "",
//           guarantor1Address: "",
//           guarantor1MembershipNo: "",
//           guarantor2Name: "",
//           guarantor2Address: "",
//           guarantor2MembershipNo: "",
//           loanAmount: "",
//           interest: "",
//           interestRate: "",
//           stationeryFees: "",
//         },
//       ]);

//       window.scrollTo(0, 0);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="mb-4">Create New Submission</h2>
//       <div className="alert alert-info mb-4">
//         <AlertCircle size={18} className="me-2" />
//         As Society Admin, you create borrower submissions. They will be sent to
//         Society Approval Officer for review.
//       </div>

//       {error && (
//         <div className="alert alert-danger">
//           <AlertCircle size={18} className="me-2" />
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="alert alert-success">
//           <CheckCircle size={18} className="me-2" />
//           {success}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         {borrowers.map((borrower, index) => (
//           <div key={borrower.id} className="card mb-4 border-0 shadow-sm">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Borrower {index + 1}</h5>
//               {borrowers.length > 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light"
//                   onClick={() => removeBorrower(borrower.id)}
//                 >
//                   <XCircle size={16} className="me-1" />
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="card-body">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Loan Number (ණය අංකය) *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.loanNumber}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanNumber", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">
//                     Borrower Name (ණය ගැනුම්කරුගේ නම) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.borrowerName}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerName",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">
//                     Borrower Address (ලිපිනය) *
//                   </label>
//                   <textarea
//                     className="form-control"
//                     rows="2"
//                     value={borrower.borrowerAddress}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerAddress",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Membership No *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.membershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "membershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">
//                     Guarantor 1 Name (ඇපකරු 1) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Guarantor 1 Membership *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">
//                     Guarantor 2 Name (ඇපකරු 2) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Guarantor 2 Membership *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Loan Amount (ණය මුදල) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.loanAmount}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanAmount", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Interest (පොළිය) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interest}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "interest", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Interest Rate (%) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interestRate}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "interestRate",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Stationery Fees *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.stationeryFees}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "stationeryFees",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="d-flex gap-2">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={addBorrower}
//           >
//             <FileText size={18} className="me-1" />
//             Add Another Borrower
//           </button>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <CheckCircle size={18} className="me-1" />
//                 Submit for Society Approval
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // ==================== My Submissions Page ====================
// const MySubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">My Submissions</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           No submissions found
//         </div>
//       ) : (
//         <div className="card border-0 shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Date</th>
//                   <th>Borrowers</th>
//                   <th>Status</th>
//                   <th>Submitted By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((s) => (
//                   <tr key={s.id}>
//                     <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {s.borrowers.length} borrowers
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`badge bg-${
//                           s.status === "approved"
//                             ? "success"
//                             : s.status === "rejected"
//                             ? "danger"
//                             : "warning"
//                         }`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td>{s.submittedBy}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <FileText size={16} className="me-1" />
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Pending Approvals Page ====================
// const PendingApprovalsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   useEffect(() => {
//     loadPendingSubmissions();
//   }, []);

//   const loadPendingSubmissions = async () => {
//     try {
//       const data = await api.getPendingApprovalsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to approve this submission? It will be sent to District Office."
//       )
//     )
//       return;

//     setActionLoading(true);
//     try {
//       await api.approveSubmission(id);
//       alert("Submission approved and sent to District Office successfully!");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async (id) => {
//     const reason = window.prompt("Enter rejection reason:");
//     if (!reason) return;

//     setActionLoading(true);
//     try {
//       await api.rejectSubmission(id, reason);
//       alert("Submission rejected");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Pending Approvals</h2>
//       <div className="alert alert-info mb-4">
//         <Clock size={18} className="me-2" />
//         Review and approve submissions created by Society Admin. Approved
//         submissions will be sent to District Office.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-warning">
//           <Clock size={18} className="me-2" />
//           No pending approvals
//         </div>
//       ) : (
//         <div className="row">
//           {submissions.map((s) => (
//             <div key={s.id} className="col-12 mb-3">
//               <div className="card border-0 shadow-sm">
//                 <div className="card-header bg-warning bg-opacity-10">
//                   <h5 className="mb-0">
//                     <Clock size={20} className="me-2" />
//                     Submission from{" "}
//                     {new Date(s.submittedDate).toLocaleDateString()}
//                   </h5>
//                 </div>
//                 <div className="card-body">
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <strong>Borrowers:</strong> {s.borrowers.length}
//                     </div>
//                     <div className="col-md-6">
//                       <strong>Submitted by:</strong> {s.submittedBy}
//                     </div>
//                   </div>

//                   <div className="table-responsive mb-3">
//                     <table className="table table-sm table-bordered">
//                       <thead className="table-light">
//                         <tr>
//                           <th>Borrower Name</th>
//                           <th>Loan No</th>
//                           <th>Amount</th>
//                           <th>Interest</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {s.borrowers.map((b, idx) => (
//                           <tr key={idx}>
//                             <td>{b.borrowerName}</td>
//                             <td>{b.loanNumber}</td>
//                             <td>Rs. {b.loanAmount}</td>
//                             <td>Rs. {b.interest}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleApprove(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <CheckCircle size={18} className="me-1" />
//                       Approve & Send to District
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleReject(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <XCircle size={18} className="me-1" />
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Approved Submissions Page ====================
// const ApprovedSubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadApprovedSubmissions();
//   }, []);

//   const loadApprovedSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       const approved = data.filter((s) => s.status === "approved");
//       setSubmissions(approved);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Approved Submissions</h2>
//       <div className="alert alert-success mb-4">
//         <CheckCircle size={18} className="me-2" />
//         These submissions have been approved and sent to District Office for
//         processing.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           No approved submissions yet
//         </div>
//       ) : (
//         <div className="card border-0 shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Submission Date</th>
//                   <th>Borrowers</th>
//                   <th>Submitted By</th>
//                   <th>Approved Date</th>
//                   <th>Approved By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((s) => (
//                   <tr key={s.id}>
//                     <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {s.borrowers.length} borrowers
//                       </span>
//                     </td>
//                     <td>{s.submittedBy}</td>
//                     <td>
//                       {s.approvedDate
//                         ? new Date(s.approvedDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td>{s.approvedBy || "-"}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <FileText size={16} className="me-1" />
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== District Submissions Page ====================
// const DistrictSubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedBorrower, setExpandedBorrower] = useState(null);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [showDecisionModal, setShowDecisionModal] = useState(false);
//   const [showDecisionDetailsModal, setShowDecisionDetailsModal] =
//     useState(false);
//   const [viewDecisionDetails, setViewDecisionDetails] = useState(null);
//   const [decisionData, setDecisionData] = useState({
//     decisionDate: "",
//     finalLoanAmount: "",
//     interestDeducted: "",
//     arbitrationDecision: "",
//   });

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getApprovedSubmissionsByDistrict(user.district);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkFeePaid = async (submissionId, borrowerId) => {
//     if (
//       !window.confirm(
//         "මෙම බේරුම් ගාස්තුව ගෙවා ඇත ලෙස සලකුණු කරන්නද? මෙය බේරුම් අංකයක් සහ නිලධාරියෙකු පවරනු ඇත."
//       )
//     )
//       return;

//     try {
//       await api.updateArbitrationFee(submissionId, borrowerId, true);
//       alert(
//         "බේරුම් ගාස්තුව ගෙවා ඇත ලෙස සලකුණු කර ඇත. බේරුම් අංකය සහ නිලධාරියා පවරා ඇත!"
//       );
//       loadSubmissions();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const handleAddDecision = (submission, borrower) => {
//     setSelectedBorrower({ submission, borrower });
//     setShowDecisionModal(true);
//     setDecisionData({
//       decisionDate: new Date().toISOString().split("T")[0],
//       finalLoanAmount: borrower.loanAmount || "",
//       interestDeducted: "",
//       arbitrationDecision: "",
//     });
//   };

//   const openDecisionDetailsModal = (borrower) => {
//     setViewDecisionDetails(borrower);
//     setShowDecisionDetailsModal(true);
//   };

//   const submitDecision = async () => {
//     if (
//       !decisionData.decisionDate ||
//       !decisionData.finalLoanAmount ||
//       !decisionData.interestDeducted ||
//       !decisionData.arbitrationDecision
//     ) {
//       alert("කරුණාකර සියලු තොරතුරු පුරවන්න");
//       return;
//     }

//     try {
//       await api.addArbitrationDecision(
//         selectedBorrower.submission.id,
//         selectedBorrower.borrower.id,
//         decisionData
//       );
//       alert("තීරණය සාර්ථකව එකතු කරන ලදී!");
//       setShowDecisionModal(false);
//       loadSubmissions();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">ජිල්ලා කාර්යාලයට ඉදිරිපත් කිරීම්</h2>
//       <div className="alert alert-success mb-4">
//         <CheckCircle size={18} className="me-2" />
//         මෙම ඉදිරිපත් කිරීම් සමිති විසින් අනුමත කර ඇති අතර ජිල්ලා කාර්යාල සැකසීම
//         සඳහා සූදානම්ය.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           සමිතිවලින් තවමත් අනුමත කළ ඉදිරිපත් කිරීම් නොමැත
//         </div>
//       ) : (
//         submissions.map((submission) => (
//           <div key={submission.id} className="card mb-4 shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0">
//                 <Building size={18} className="me-2" />
//                 {submission.societyName || "Society"}
//               </h5>
//               <small>
//                 අනුමත කළ දිනය:{" "}
//                 {new Date(
//                   submission.approvedDate || submission.submittedDate
//                 ).toLocaleDateString("si-LK")}
//               </small>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>ණය අංකය</th>
//                       <th>නම</th>
//                       <th>ලිපිනය</th>
//                       <th>ණය මුදල</th>
//                       <th>පොලිය</th>
//                       <th>බේරුම් ගාස්තු</th>
//                       <th>බේරුම් අංකය</th>
//                       <th>බේරුම්කරු</th>
//                       <th>තීරණය</th>
//                       <th>විස්තර</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submission.borrowers.map((borrower) => (
//                       <React.Fragment key={borrower.id}>
//                         <tr>
//                           <td>{borrower.loanNumber}</td>
//                           <td>
//                             <strong>{borrower.borrowerName}</strong>
//                           </td>
//                           <td>{borrower.borrowerAddress}</td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(borrower.loanAmount).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(borrower.interest).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td className="text-center">
//                             {borrower.arbitrationFeePaid ? (
//                               <span className="badge bg-success">ගෙවා ඇත</span>
//                             ) : (
//                               <div className="btn-group btn-group-sm">
//                                 <button
//                                   onClick={() =>
//                                     handleMarkFeePaid(
//                                       submission.id,
//                                       borrower.id
//                                     )
//                                   }
//                                   className="btn btn-success"
//                                 >
//                                   ගෙවා ඇත
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                           <td className="fw-bold text-primary">
//                             {borrower.arbitrationNumber || "-"}
//                           </td>
//                           <td>
//                             {borrower.assignedOfficer ||
//                               borrower.assignedOfficerName ||
//                               "-"}
//                           </td>
//                           <td className="text-center">
//                             {borrower.status === "assigned" &&
//                               !borrower.arbitrationDecision && (
//                                 <button
//                                   onClick={() =>
//                                     handleAddDecision(submission, borrower)
//                                   }
//                                   className="btn btn-info btn-sm"
//                                 >
//                                   තීරණය එකතු කරන්න
//                                 </button>
//                               )}
//                             {borrower.arbitrationDecision && (
//                               <button
//                                 onClick={() =>
//                                   openDecisionDetailsModal(borrower)
//                                 }
//                                 className="btn btn-success btn-sm"
//                               >
//                                 <CheckCircle size={14} className="me-1" />
//                                 තීරණය බලන්න
//                               </button>
//                             )}
//                             {borrower.status === "pending" && "-"}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() =>
//                                 setExpandedBorrower(
//                                   expandedBorrower === borrower.id
//                                     ? null
//                                     : borrower.id
//                                 )
//                               }
//                               className="btn btn-info btn-sm"
//                             >
//                               <FileText size={14} className="me-1" />
//                               විස්තර
//                             </button>
//                           </td>
//                         </tr>
//                         {expandedBorrower === borrower.id && (
//                           <tr>
//                             <td colSpan="10" className="bg-light">
//                               <div className="row g-3 p-3">
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-primary border-bottom pb-2">
//                                         ණයගැතියාගේ සම්පූර්ණ තොරතුරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.borrowerName}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.borrowerAddress}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.membershipNo}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>ණය අංකය:</strong>{" "}
//                                         {borrower.loanNumber}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-success border-bottom pb-2">
//                                         ණය විස්තර
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>ණය මුදල:</strong> රු.{" "}
//                                         {parseFloat(
//                                           borrower.loanAmount
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>පොලිය:</strong> රු.{" "}
//                                         {parseFloat(
//                                           borrower.interest
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>පොලී අනුපාතය:</strong>{" "}
//                                         {borrower.interestRate}%
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>ලිපි ද්‍රව්‍ය ගාස්තු:</strong>{" "}
//                                         රු.{" "}
//                                         {parseFloat(
//                                           borrower.stationeryFees || 0
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-info border-bottom pb-2">
//                                         පළමු ඇපකරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.guarantor1Name}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.guarantor1Address}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.guarantor1MembershipNo}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-info border-bottom pb-2">
//                                         දෙවන ඇපකරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.guarantor2Name}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.guarantor2Address}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.guarantor2MembershipNo}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         ))
//       )}

//       {/* Decision Modal */}
//       {showDecisionModal && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <CheckCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණය එකතු කරන්න
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <Calendar size={16} className="me-2 text-primary" />
//                         ණය ලබා දුන් අවසාන දිනය *
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control form-control-lg"
//                         value={decisionData.decisionDate}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             decisionDate: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <DollarSign size={16} className="me-2 text-success" />
//                         ලැබුණු ණය මුදල (රු.) *
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control form-control-lg"
//                         placeholder="0.00"
//                         value={decisionData.finalLoanAmount}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             finalLoanAmount: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <Percent size={16} className="me-2 text-warning" />
//                         අඩු කළ පොලිය (රු.) *
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control form-control-lg"
//                         placeholder="0.00"
//                         value={decisionData.interestDeducted}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             interestDeducted: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-12">
//                       <label className="form-label fw-bold">
//                         <FileText size={16} className="me-2 text-info" />
//                         බේරුම්කරුගේ තීරණය / සටහන් *
//                       </label>
//                       <textarea
//                         className="form-control form-control-lg"
//                         rows="4"
//                         placeholder="තීරණය හෝ සටහන් මෙහි ඇතුළත් කරන්න..."
//                         value={decisionData.arbitrationDecision}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             arbitrationDecision: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div
//                     className="alert alert-info mt-4 mb-0"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <AlertCircle size={16} className="me-2" />
//                     <small>
//                       සියලු තාරකා (*) සලකුණු කළ ක්ෂේත්‍ර පුරවීම අනිවාර්ය වේ
//                     </small>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-secondary btn-lg px-4"
//                     onClick={() => setShowDecisionModal(false)}
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     අවලංගු කරන්න
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-4"
//                     onClick={submitDecision}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <CheckCircle size={16} className="me-2" />
//                     තීරණය සුරකින්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Decision Details Modal */}
//       {showDecisionDetailsModal && viewDecisionDetails && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//             onClick={() => setShowDecisionDetailsModal(false)}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <AlertCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණයේ සම්පූර්ණ විස්තර
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-12">
//                       <div className="card border-primary">
//                         <div className="card-header bg-primary text-white">
//                           <h6 className="mb-0">
//                             <Users size={16} className="me-2" />
//                             ණයගැතියාගේ තොරතුරු
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>නම:</strong>{" "}
//                                 {viewDecisionDetails.borrowerName}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>ණය අංකය:</strong>{" "}
//                                 {viewDecisionDetails.loanNumber}
//                               </p>
//                               <p className="mb-0">
//                                 <strong>බේරුම් අංකය:</strong>{" "}
//                                 <span className="text-primary fw-bold">
//                                   {viewDecisionDetails.arbitrationNumber}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>ලිපිනය:</strong>{" "}
//                                 {viewDecisionDetails.borrowerAddress}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>බේරුම්කරු:</strong>{" "}
//                                 {viewDecisionDetails.assignedOfficer}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-success">
//                         <div className="card-header bg-success text-white">
//                           <h6 className="mb-0">
//                             <DollarSign size={16} className="me-2" />
//                             මුල් ණය විස්තර
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>ණය මුදල:</strong>
//                                 <br />
//                                 <span className="text-success fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.loanAmount
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>පොලිය:</strong>
//                                 <br />
//                                 <span className="text-warning fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.interest
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-0">
//                                 <strong>පොලී අනුපාතය:</strong>
//                                 <br />
//                                 <span className="text-info fs-5">
//                                   {viewDecisionDetails.interestRate}%
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-info">
//                         <div className="card-header bg-info text-white">
//                           <h6 className="mb-0">
//                             <CheckCircle size={16} className="me-2" />
//                             බේරුම්කරු තීරණය
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row mb-3">
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ණය ලබා දුන් අවසාන දිනය
//                               </label>
//                               <p className="fw-bold">
//                                 {viewDecisionDetails.decisionDate
//                                   ? new Date(
//                                       viewDecisionDetails.decisionDate
//                                     ).toLocaleDateString("si-LK")
//                                   : "-"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ලැබුණු ණය මුදල
//                               </label>
//                               <p className="fw-bold text-success fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.finalLoanAmount
//                                   ? parseFloat(
//                                       viewDecisionDetails.finalLoanAmount
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 අඩු කළ පොලිය
//                               </label>
//                               <p className="fw-bold text-danger fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.interestDeducted
//                                   ? parseFloat(
//                                       viewDecisionDetails.interestDeducted
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                           </div>
//                           <div
//                             className="alert alert-light border"
//                             style={{ borderRadius: "10px" }}
//                           >
//                             <label className="text-muted small mb-2">
//                               තීරණය / සටහන්
//                             </label>
//                             <p
//                               className="mb-0"
//                               style={{ whiteSpace: "pre-wrap" }}
//                             >
//                               {viewDecisionDetails.arbitrationDecision || "-"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-5"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     වසන්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ==================== Provincial Overview Page ====================
// const ProvincialOverviewPage = ({ user }) => {
//   const [allSubmissions, setAllSubmissions] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedDistrict, setExpandedDistrict] = useState(null);
//   const [showDecisionDetailsModal, setShowDecisionDetailsModal] =
//     useState(false);
//   const [viewDecisionDetails, setViewDecisionDetails] = useState(null);

//   useEffect(() => {
//     loadProvincialData();
//   }, []);

//   const loadProvincialData = async () => {
//     try {
//       const [districtsData, submissionsData] = await Promise.all([
//         api.getDistricts(),
//         // For provincial admin, we need to fetch submissions from all districts
//         Promise.resolve([]), // This would be replaced with actual API call to get all submissions
//       ]);
//       setDistricts(districtsData);
//       setAllSubmissions(submissionsData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDecisionDetailsModal = (borrower) => {
//     setViewDecisionDetails(borrower);
//     setShowDecisionDetailsModal(true);
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">පළාත් කාර්යාල පාලන පුවරුව</h2>
//       <p className="text-muted mb-4">
//         මධ්‍ය පළාතේ සියලුම දිස්ත්‍රික්ක වල තොරතුරු
//       </p>

//       {districts.map((district) => {
//         const districtSubmissions = allSubmissions.filter(
//           (s) => s.district === district.id
//         );
//         const totalBorrowers = districtSubmissions.reduce(
//           (sum, sub) => sum + sub.borrowers.length,
//           0
//         );
//         const completedDecisions = districtSubmissions
//           .flatMap((s) => s.borrowers)
//           .filter((b) => b.status === "decision-given").length;
//         const pendingCount = districtSubmissions
//           .flatMap((s) => s.borrowers)
//           .filter((b) => b.status === "pending").length;

//         return (
//           <div key={district.id} className="card mb-4 border-primary shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <div className="d-flex justify-content-between align-items-center">
//                 <h4 className="mb-0">
//                   <Building size={20} className="me-2" />
//                   {district.name} දිස්ත්‍රික්කය
//                 </h4>
//                 <button
//                   className="btn btn-light btn-sm"
//                   onClick={() =>
//                     setExpandedDistrict(
//                       expandedDistrict === district.id ? null : district.id
//                     )
//                   }
//                 >
//                   {expandedDistrict === district.id
//                     ? "Hide Details"
//                     : "View Details"}
//                 </button>
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="row mb-3">
//                 <div className="col-md-3">
//                   <div className="card bg-info text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <FileText size={20} />
//                       </h5>
//                       <h6 className="mb-1">ඉදිරිපත් කිරීම්</h6>
//                       <h2 className="mb-0">{districtSubmissions.length}</h2>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="card bg-warning text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <Users size={20} />
//                       </h5>
//                       <h6 className="mb-1">ණයගැතියන්</h6>
//                       <h2 className="mb-0">{totalBorrowers}</h2>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="card bg-success text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <CheckCircle size={20} />
//                       </h5>
//                       <h6 className="mb-1">සම්පූර්ණ තීරණ</h6>
//                       <h2 className="mb-0">{completedDecisions}</h2>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-md-3">
//                   <div className="card bg-danger text-white">
//                     <div className="card-body text-center">
//                       <h5 className="card-title mb-2">
//                         <Clock size={20} />
//                       </h5>
//                       <h6 className="mb-1">අනුමැතියට</h6>
//                       <h2 className="mb-0">{pendingCount}</h2>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {expandedDistrict === district.id &&
//                 districtSubmissions.length > 0 && (
//                   <div className="mt-4">
//                     {districtSubmissions.map((submission) => (
//                       <div
//                         key={submission.id}
//                         className="card mb-3 border-secondary"
//                       >
//                         <div className="card-header bg-light">
//                           <h6 className="mb-0">
//                             <Building size={16} className="me-2" />
//                             {submission.societyName || "Society"}
//                           </h6>
//                           <small className="text-muted">
//                             අනුමත කළ දිනය:{" "}
//                             {submission.approvedDate
//                               ? new Date(
//                                   submission.approvedDate
//                                 ).toLocaleDateString("si-LK")
//                               : "-"}
//                           </small>
//                         </div>
//                         <div className="card-body">
//                           <div className="table-responsive">
//                             <table className="table table-sm table-bordered mb-0">
//                               <thead className="table-light">
//                                 <tr>
//                                   <th>ණය අංකය</th>
//                                   <th>ණයගැතියා</th>
//                                   <th>ණය මුදල</th>
//                                   <th>බේරුම් අංකය</th>
//                                   <th>බේරුම්කරු</th>
//                                   <th>තත්වය</th>
//                                   <th>තීරණය</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {submission.borrowers.map((borrower) => (
//                                   <tr key={borrower.id}>
//                                     <td>{borrower.loanNumber}</td>
//                                     <td>{borrower.borrowerName}</td>
//                                     <td>
//                                       රු.{" "}
//                                       {parseFloat(
//                                         borrower.loanAmount
//                                       ).toLocaleString("si-LK")}
//                                     </td>
//                                     <td>{borrower.arbitrationNumber || "-"}</td>
//                                     <td>{borrower.assignedOfficer || "-"}</td>
//                                     <td>
//                                       {borrower.status === "pending" && (
//                                         <span className="badge bg-warning">
//                                           අනුමැතියට
//                                         </span>
//                                       )}
//                                       {borrower.status === "assigned" && (
//                                         <span className="badge bg-info">
//                                           පවරා ඇත
//                                         </span>
//                                       )}
//                                       {borrower.status === "decision-given" && (
//                                         <span className="badge bg-success">
//                                           තීරණය ලබා දී ඇත
//                                         </span>
//                                       )}
//                                     </td>
//                                     <td className="text-center">
//                                       {borrower.arbitrationDecision ? (
//                                         <button
//                                           onClick={() =>
//                                             openDecisionDetailsModal(borrower)
//                                           }
//                                           className="btn btn-info btn-sm"
//                                         >
//                                           <FileText
//                                             size={14}
//                                             className="me-1"
//                                           />
//                                           තීරණය බලන්න
//                                         </button>
//                                       ) : borrower.status === "assigned" ? (
//                                         <span className="badge bg-warning">
//                                           බලා සිටින්න
//                                         </span>
//                                       ) : (
//                                         "-"
//                                       )}
//                                     </td>
//                                   </tr>
//                                 ))}
//                               </tbody>
//                             </table>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//               {expandedDistrict === district.id &&
//                 districtSubmissions.length === 0 && (
//                   <div className="alert alert-info mt-3">
//                     <AlertCircle size={16} className="me-2" />
//                     මෙම දිස්ත්‍රික්කයේ තවමත් ඉදිරිපත් කිරීම් නොමැත
//                   </div>
//                 )}
//             </div>
//           </div>
//         );
//       })}

//       {/* Decision Details Modal */}
//       {showDecisionDetailsModal && viewDecisionDetails && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//             onClick={() => setShowDecisionDetailsModal(false)}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <AlertCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණයේ සම්පූර්ණ විස්තර
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-12">
//                       <div className="card border-primary">
//                         <div className="card-header bg-primary text-white">
//                           <h6 className="mb-0">
//                             <Users size={16} className="me-2" />
//                             ණයගැතියාගේ තොරතුරු
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>නම:</strong>{" "}
//                                 {viewDecisionDetails.borrowerName}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>ණය අංකය:</strong>{" "}
//                                 {viewDecisionDetails.loanNumber}
//                               </p>
//                               <p className="mb-0">
//                                 <strong>බේරුම් අංකය:</strong>{" "}
//                                 <span className="text-primary fw-bold">
//                                   {viewDecisionDetails.arbitrationNumber}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-6">
//                               <p className="mb-2">
//                                 <strong>ලිපිනය:</strong>{" "}
//                                 {viewDecisionDetails.borrowerAddress}
//                               </p>
//                               <p className="mb-2">
//                                 <strong>බේරුම්කරු:</strong>{" "}
//                                 {viewDecisionDetails.assignedOfficer}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-success">
//                         <div className="card-header bg-success text-white">
//                           <h6 className="mb-0">
//                             <DollarSign size={16} className="me-2" />
//                             මුල් ණය විස්තර
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row">
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>ණය මුදල:</strong>
//                                 <br />
//                                 <span className="text-success fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.loanAmount
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-2">
//                                 <strong>පොලිය:</strong>
//                                 <br />
//                                 <span className="text-warning fs-5">
//                                   රු.{" "}
//                                   {parseFloat(
//                                     viewDecisionDetails.interest
//                                   ).toLocaleString("si-LK")}
//                                 </span>
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <p className="mb-0">
//                                 <strong>පොලී අනුපාතය:</strong>
//                                 <br />
//                                 <span className="text-info fs-5">
//                                   {viewDecisionDetails.interestRate}%
//                                 </span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="col-12">
//                       <div className="card border-info">
//                         <div className="card-header bg-info text-white">
//                           <h6 className="mb-0">
//                             <CheckCircle size={16} className="me-2" />
//                             බේරුම්කරු තීරණය
//                           </h6>
//                         </div>
//                         <div className="card-body">
//                           <div className="row mb-3">
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ණය ලබා දුන් අවසාන දිනය
//                               </label>
//                               <p className="fw-bold">
//                                 {viewDecisionDetails.decisionDate
//                                   ? new Date(
//                                       viewDecisionDetails.decisionDate
//                                     ).toLocaleDateString("si-LK")
//                                   : "-"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 ලැබුණු ණය මුදල
//                               </label>
//                               <p className="fw-bold text-success fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.finalLoanAmount
//                                   ? parseFloat(
//                                       viewDecisionDetails.finalLoanAmount
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                             <div className="col-md-4">
//                               <label className="text-muted small">
//                                 අඩු කළ පොලිය
//                               </label>
//                               <p className="fw-bold text-danger fs-5">
//                                 රු.{" "}
//                                 {viewDecisionDetails.interestDeducted
//                                   ? parseFloat(
//                                       viewDecisionDetails.interestDeducted
//                                     ).toLocaleString("si-LK")
//                                   : "0"}
//                               </p>
//                             </div>
//                           </div>
//                           <div
//                             className="alert alert-light border"
//                             style={{ borderRadius: "10px" }}
//                           >
//                             <label className="text-muted small mb-2">
//                               තීරණය / සටහන්
//                             </label>
//                             <p
//                               className="mb-0"
//                               style={{ whiteSpace: "pre-wrap" }}
//                             >
//                               {viewDecisionDetails.arbitrationDecision || "-"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-5"
//                     onClick={() => setShowDecisionDetailsModal(false)}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #17a2b8 0%, #138496 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     වසන්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ==================== Manage Societies Page ====================
// const ManageSocietiesPage = ({ user }) => {
//   const [societies, setSocieties] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district,
//     registrationNo: "",
//     registeredAddress: "",
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const [societiesData, districtsData] = await Promise.all([
//         api.getSocietiesByDistrict(user.district),
//         api.getDistricts(),
//       ]);
//       setSocieties(societiesData);
//       setDistricts(districtsData);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createSociety(formData);
//       alert("Society created successfully!");
//       setShowModal(false);
//       setFormData({
//         name: "",
//         districtId: user.district,
//         registrationNo: "",
//         registeredAddress: "",
//       });
//       loadData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Societies</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Building size={18} className="me-1" />
//           Add Society
//         </button>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Society Name</th>
//                 <th>Registration No</th>
//                 <th>Address</th>
//                 <th>Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {societies.map((s) => (
//                 <tr key={s.id}>
//                   <td>
//                     <strong>{s.name}</strong>
//                   </td>
//                   <td>{s.registrationNo}</td>
//                   <td>{s.registeredAddress}</td>
//                   <td>{new Date(s.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Society</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Society Name (සමිති නම) *
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">District *</label>
//                     <select
//                       className="form-select"
//                       value={formData.districtId}
//                       onChange={(e) =>
//                         setFormData({ ...formData, districtId: e.target.value })
//                       }
//                       required
//                     >
//                       {districts.map((d) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Registration No</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.registrationNo}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registrationNo: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Registered Address (ලියාපදිංචි ලිපිනය)
//                     </label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       value={formData.registeredAddress}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registeredAddress: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Society
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Manage Officers Page ====================
// const ManageOfficersPage = ({ user }) => {
//   const [officers, setOfficers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district,
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadOfficers();
//   }, []);

//   const loadOfficers = async () => {
//     try {
//       const data = await api.getOfficersByDistrict(user.district);
//       setOfficers(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createOfficer(formData);
//       alert("Officer created successfully!");
//       setShowModal(false);
//       setFormData({ name: "", districtId: user.district });
//       loadOfficers();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Arbitration Officers</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Users size={18} className="me-1" />
//           Add Officer
//         </button>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Officer Name</th>
//                 <th>District</th>
//                 <th>Status</th>
//                 <th>Created</th>
//               </tr>
//             </thead>
//             <tbody>
//               {officers.map((o) => (
//                 <tr key={o.id}>
//                   <td>
//                     <strong>{o.name}</strong>
//                   </td>
//                   <td>{o.districtId}</td>
//                   <td>
//                     {o.assignedToSocietyId ? (
//                       <span className="badge bg-warning">Assigned</span>
//                     ) : (
//                       <span className="badge bg-success">Available</span>
//                     )}
//                   </td>
//                   <td>{new Date(o.createdAt).toLocaleDateString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Officer</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">
//                       Officer Name (නිලධාරීගේ නම) *
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Officer
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Main App Component ====================
// const App = () => {
//   const { user, loading } = useAuth();
//   const [showSignup, setShowSignup] = useState(false);

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//         />
//       </div>
//     );
//   }

//   if (!user) {
//     return showSignup ? (
//       <SignupPage onBackToLogin={() => setShowSignup(false)} />
//     ) : (
//       <LoginPage onShowSignup={() => setShowSignup(true)} />
//     );
//   }

//   return <Dashboard />;
// };

// // ==================== Root Component ====================
// const Root = () => (
//   <AuthProvider>
//     <link
//       href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//       rel="stylesheet"
//     />
//     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
//     <App />
//   </AuthProvider>
// );

// export default Root;

//------------------------------------------------------***********************************************

// import React, { useState, useEffect, createContext, useContext } from "react";
// import {
//   FileText,
//   Users,
//   Building,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle,
//   Home,
//   LogOut,
//   Menu,
//   Calendar,
//   DollarSign,
//   Percent,
//   ArrowLeft,
// } from "lucide-react";

// // ==================== Context ====================
// const AuthContext = createContext(null);

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const checkSession = () => {
//       const storedUser = sessionStorage.getItem("user");
//       const token = sessionStorage.getItem("token");

//       if (storedUser && token) {
//         try {
//           setUser(JSON.parse(storedUser));
//         } catch (e) {
//           sessionStorage.clear();
//         }
//       }
//       setLoading(false);
//     };
//     checkSession();
//   }, []);

//   const login = (userData, token) => {
//     sessionStorage.setItem("token", token);
//     sessionStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// const useAuth = () => useContext(AuthContext);

// // ==================== API Service ====================
// const API_BASE_URL = "http://localhost:8081/api";

// const api = {
//   async request(endpoint, options = {}) {
//     const token = sessionStorage.getItem("token");
//     const headers = {
//       "Content-Type": "application/json",
//       ...options.headers,
//     };

//     if (token) {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//         ...options,
//         headers,
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Request failed");
//       }

//       return response.json();
//     } catch (error) {
//       console.error("API Error:", error);
//       throw error;
//     }
//   },

//   // Authentication
//   login: (data) =>
//     api.request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
//   signup: (data) =>
//     api.request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),

//   // Districts
//   getDistricts: () => api.request("/districts"),

//   // Societies
//   getSocieties: () => api.request("/societies"),
//   getSocietiesByDistrict: (districtId) =>
//     api.request(`/societies/district/${districtId}`),
//   createSociety: (data) =>
//     api.request("/societies", { method: "POST", body: JSON.stringify(data) }),

//   // Officers
//   getOfficersByDistrict: (districtId) =>
//     api.request(`/officers/district/${districtId}`),
//   getAvailableOfficersForRegistration: (districtId) =>
//     api.request(`/officers/district/${districtId}/available-for-registration`),
//   createOfficer: (data) =>
//     api.request("/officers", { method: "POST", body: JSON.stringify(data) }),

//   // NEW: Officer-specific endpoints
//   getOfficerAssignedSubmissions: () =>
//     api.request("/submissions/officer/my-submissions"),
//   getOfficerAssignedBorrowers: () =>
//     api.request("/submissions/officer/my-borrowers"),

//   // Submissions
//   createSubmission: (data) =>
//     api.request("/submissions", { method: "POST", body: JSON.stringify(data) }),
//   approveSubmission: (id) =>
//     api.request(`/submissions/${id}/approve`, { method: "PUT" }),
//   rejectSubmission: (id, reason) =>
//     api.request(`/submissions/${id}/reject`, {
//       method: "PUT",
//       body: JSON.stringify({ reason }),
//     }),
//   getSubmissionsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}`),
//   getPendingApprovalsBySociety: (societyId) =>
//     api.request(`/submissions/society/${societyId}/pending`),
//   getApprovedSubmissionsByDistrict: (districtId) =>
//     api.request(`/submissions/district/${districtId}/approved`),
//   updateArbitrationFee: (submissionId, borrowerId, isPaid) =>
//     api.request(`/submissions/${submissionId}/borrowers/${borrowerId}/fee`, {
//       method: "PUT",
//       body: JSON.stringify({ isPaid }),
//     }),
//   addArbitrationDecision: (submissionId, borrowerId, data) =>
//     api.request(
//       `/submissions/${submissionId}/borrowers/${borrowerId}/decision`,
//       { method: "PUT", body: JSON.stringify(data) }
//     ),
// };

// // ==================== Login Component ====================
// const LoginPage = ({ onShowSignup }) => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const response = await api.login(formData);
//       login(response, response.token);
//     } catch (err) {
//       setError(err.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-5">
//                 <div className="text-center mb-4">
//                   <h2 className="fw-bold text-primary">ඍණ අය කිරීමේ පද්ධතිය</h2>
//                   <p className="text-muted">
//                     Central Province Debt Collection System
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="alert alert-danger" role="alert">
//                     <AlertCircle size={18} className="me-2" />
//                     {error}
//                   </div>
//                 )}

//                 <form onSubmit={handleSubmit}>
//                   <div className="mb-3">
//                     <label className="form-label">Email Address</label>
//                     <input
//                       type="email"
//                       className="form-control form-control-lg"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                       placeholder="Enter your email"
//                       required
//                     />
//                   </div>

//                   <div className="mb-4">
//                     <label className="form-label">Password</label>
//                     <input
//                       type="password"
//                       className="form-control form-control-lg"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                       }
//                       placeholder="Enter your password"
//                       required
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-100"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Logging in...
//                       </>
//                     ) : (
//                       "Login"
//                     )}
//                   </button>
//                 </form>

//                 <hr className="my-4" />

//                 <div className="text-center">
//                   <p className="text-muted mb-0">Don't have an account?</p>
//                   <button
//                     className="btn btn-link text-decoration-none"
//                     onClick={onShowSignup}
//                   >
//                     Register Now
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== Signup Component ====================
// const SignupPage = ({ onBackToLogin }) => {
//   const [userType, setUserType] = useState("SOCIETY");
//   const [districts, setDistricts] = useState([]);
//   const [societies, setSocieties] = useState([]);
//   const [officers, setOfficers] = useState([]);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     name: "",
//     district: "",
//     society: "",
//     role: "SOCIETY_ADMIN",
//     officerId: "",
//     designation: "",
//   });
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     loadDistricts();
//   }, []);

//   useEffect(() => {
//     if (formData.district && userType === "SOCIETY") {
//       loadSocieties(formData.district);
//     }
//   }, [formData.district, userType]);

//   useEffect(() => {
//     if (
//       formData.district &&
//       userType === "OFFICER" &&
//       formData.role === "OFFICER"
//     ) {
//       loadAvailableOfficers(formData.district);
//     }
//   }, [formData.district, formData.role, userType]);

//   const loadDistricts = async () => {
//     try {
//       const data = await api.getDistricts();
//       setDistricts(data);
//     } catch (err) {
//       setError("Failed to load districts");
//     }
//   };

//   const loadSocieties = async (districtId) => {
//     try {
//       const data = await api.getSocietiesByDistrict(districtId);
//       setSocieties(data || []);
//     } catch (err) {
//       console.error("Failed to load societies:", err);
//       setSocieties([]);
//     }
//   };

//   const loadAvailableOfficers = async (districtId) => {
//     try {
//       const data = await api.getAvailableOfficersForRegistration(districtId);
//       setOfficers(data || []);
//     } catch (err) {
//       console.error("Failed to load officers:", err);
//       setOfficers([]);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     if (formData.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       return;
//     }

//     // Provincial admin doesn't need district
//     if (userType === "OFFICER" && formData.role === "PROVINCIAL_ADMIN") {
//       // No district validation
//     } else if (!formData.district) {
//       setError("Please select a district");
//       return;
//     }

//     setLoading(true);

//     try {
//       let signupData = {
//         email: formData.email,
//         password: formData.password,
//         userType: userType,
//       };

//       // Provincial admin doesn't have district
//       if (!(userType === "OFFICER" && formData.role === "PROVINCIAL_ADMIN")) {
//         signupData.district = formData.district;
//       }

//       if (userType === "SOCIETY") {
//         signupData = {
//           ...signupData,
//           name: formData.name,
//           society: formData.society,
//           role: formData.role,
//         };
//       } else if (userType === "OFFICER") {
//         if (formData.role === "OFFICER") {
//           signupData = {
//             ...signupData,
//             officerId: formData.officerId,
//             designation: "Arbitration Officer",
//           };
//         } else {
//           signupData = {
//             ...signupData,
//             name: formData.name,
//             designation:
//               formData.role === "DISTRICT_ADMIN"
//                 ? "District Administrator"
//                 : "Provincial Administrator",
//           };
//         }
//         signupData.role = formData.role;
//       }

//       await api.signup(signupData);
//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => onBackToLogin(), 2000);
//     } catch (err) {
//       setError(err.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-5">
//       <div className="container">
//         <div className="row justify-content-center">
//           <div className="col-md-7">
//             <div className="card shadow-lg border-0">
//               <div className="card-body p-5">
//                 <h2 className="text-center mb-4 fw-bold">
//                   Register New Account
//                 </h2>

//                 {error && (
//                   <div className="alert alert-danger">
//                     <AlertCircle size={18} className="me-2" />
//                     {error}
//                   </div>
//                 )}
//                 {success && (
//                   <div className="alert alert-success">
//                     <CheckCircle size={18} className="me-2" />
//                     {success}
//                   </div>
//                 )}

//                 <div className="btn-group w-100 mb-4" role="group">
//                   <button
//                     type="button"
//                     className={`btn ${
//                       userType === "SOCIETY"
//                         ? "btn-primary"
//                         : "btn-outline-primary"
//                     }`}
//                     onClick={() => {
//                       setUserType("SOCIETY");
//                       setFormData({
//                         ...formData,
//                         role: "SOCIETY_ADMIN",
//                         society: "",
//                         officerId: "",
//                         designation: "",
//                       });
//                       setError("");
//                     }}
//                   >
//                     <Users size={18} className="me-2" />
//                     Society Member
//                   </button>
//                   <button
//                     type="button"
//                     className={`btn ${
//                       userType === "OFFICER"
//                         ? "btn-primary"
//                         : "btn-outline-primary"
//                     }`}
//                     onClick={() => {
//                       setUserType("OFFICER");
//                       setFormData({
//                         ...formData,
//                         society: "",
//                         role: "OFFICER",
//                         officerId: "",
//                         name: "",
//                         designation: "",
//                       });
//                       setError("");
//                     }}
//                   >
//                     <Building size={18} className="me-2" />
//                     Officer/Admin
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit}>
//                   <div className="row">
//                     {/* District - Hidden for Provincial Admin */}
//                     {!(
//                       userType === "OFFICER" &&
//                       formData.role === "PROVINCIAL_ADMIN"
//                     ) && (
//                       <div className="col-12 mb-3">
//                         <label className="form-label">
//                           District (දිස්ත්‍රික්කය) *
//                         </label>
//                         <select
//                           className="form-select"
//                           value={formData.district}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               district: e.target.value,
//                               society: "",
//                               officerId: "",
//                             });
//                             setError("");
//                           }}
//                           required
//                         >
//                           <option value="">Select District</option>
//                           {districts.map((d) => (
//                             <option key={d.id} value={d.id}>
//                               {d.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}

//                     {userType === "OFFICER" && (
//                       <div className="col-12 mb-3">
//                         <label className="form-label">Role (භූමිකාව) *</label>
//                         <select
//                           className="form-select"
//                           value={formData.role}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               role: e.target.value,
//                               officerId: "",
//                               name: "",
//                               district:
//                                 e.target.value === "PROVINCIAL_ADMIN"
//                                   ? ""
//                                   : formData.district,
//                             });
//                             setError("");
//                           }}
//                           required
//                         >
//                           <option value="OFFICER">
//                             Arbitration Officer - බේරුම්කරු
//                           </option>
//                           <option value="DISTRICT_ADMIN">
//                             District Administrator - දිස්ත්‍රික් පරිපාලක
//                           </option>
//                           <option value="PROVINCIAL_ADMIN">
//                             Provincial Administrator - පළාත් පරිපාලක
//                           </option>
//                         </select>
//                       </div>
//                     )}

//                     {/* Officer Role - Select from dropdown */}
//                     {userType === "OFFICER" && formData.role === "OFFICER" && (
//                       <div className="col-12 mb-3">
//                         <label className="form-label">
//                           Select Your Name (ඔබේ නම තෝරන්න) *
//                         </label>
//                         <select
//                           className="form-select"
//                           value={formData.officerId}
//                           onChange={(e) => {
//                             setFormData({
//                               ...formData,
//                               officerId: e.target.value,
//                             });
//                             setError("");
//                           }}
//                           required
//                           disabled={!formData.district}
//                         >
//                           <option value="">
//                             -- Select Your Name from List --
//                           </option>
//                           {officers.map((officer) => (
//                             <option key={officer.id} value={officer.id}>
//                               {officer.name}
//                             </option>
//                           ))}
//                         </select>
//                       </div>
//                     )}

//                     {/* Admin Roles - Manual name entry */}
//                     {userType === "OFFICER" &&
//                       (formData.role === "DISTRICT_ADMIN" ||
//                         formData.role === "PROVINCIAL_ADMIN") && (
//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">
//                             Full Name (සම්පූර්ණ නම) *
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter your full name"
//                             value={formData.name}
//                             onChange={(e) =>
//                               setFormData({ ...formData, name: e.target.value })
//                             }
//                             required
//                           />
//                         </div>
//                       )}

//                     {/* Society users - Manual name entry */}
//                     {userType === "SOCIETY" && (
//                       <>
//                         <div className="col-md-6 mb-3">
//                           <label className="form-label">
//                             Full Name (සම්පූර්ණ නම) *
//                           </label>
//                           <input
//                             type="text"
//                             className="form-control"
//                             placeholder="Enter your full name"
//                             value={formData.name}
//                             onChange={(e) =>
//                               setFormData({ ...formData, name: e.target.value })
//                             }
//                             required
//                           />
//                         </div>

//                         <div className="col-12 mb-3">
//                           <label className="form-label">
//                             Society (සමිතිය) *
//                           </label>
//                           <select
//                             className="form-select"
//                             value={formData.society}
//                             onChange={(e) => {
//                               setFormData({
//                                 ...formData,
//                                 society: e.target.value,
//                               });
//                               setError("");
//                             }}
//                             required
//                             disabled={!formData.district}
//                           >
//                             <option value="">Select Society</option>
//                             {societies.map((s) => (
//                               <option key={s.id} value={s.id}>
//                                 {s.name}
//                               </option>
//                             ))}
//                           </select>
//                         </div>

//                         <div className="col-12 mb-3">
//                           <label className="form-label">Society Role *</label>
//                           <select
//                             className="form-select"
//                             value={formData.role}
//                             onChange={(e) =>
//                               setFormData({ ...formData, role: e.target.value })
//                             }
//                             required
//                           >
//                             <option value="SOCIETY_ADMIN">Society Admin</option>
//                             <option value="SOCIETY_APPROVAL">
//                               Society Approval
//                             </option>
//                           </select>
//                         </div>
//                       </>
//                     )}

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Email Address *</label>
//                       <input
//                         type="email"
//                         className="form-control"
//                         placeholder="example@email.com"
//                         value={formData.email}
//                         onChange={(e) =>
//                           setFormData({ ...formData, email: e.target.value })
//                         }
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Password *</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Minimum 6 characters"
//                         value={formData.password}
//                         onChange={(e) =>
//                           setFormData({ ...formData, password: e.target.value })
//                         }
//                         minLength={6}
//                         required
//                       />
//                     </div>

//                     <div className="col-md-6 mb-3">
//                       <label className="form-label">Confirm Password *</label>
//                       <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Re-enter password"
//                         value={formData.confirmPassword}
//                         onChange={(e) =>
//                           setFormData({
//                             ...formData,
//                             confirmPassword: e.target.value,
//                           })
//                         }
//                         minLength={6}
//                         required
//                       />
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-primary btn-lg w-100 mt-3"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2" />
//                         Registering...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle size={18} className="me-2" />
//                         Register Account
//                       </>
//                     )}
//                   </button>
//                 </form>

//                 <hr className="my-4" />

//                 <div className="text-center">
//                   <button
//                     className="btn btn-link text-decoration-none"
//                     onClick={onBackToLogin}
//                   >
//                     <ArrowLeft size={16} className="me-1" />
//                     Already have an account? Login here
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==================== Dashboard Layout ====================
// const DashboardLayout = ({ sidebar, content }) => {
//   const { user, logout } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <nav className="navbar navbar-dark bg-primary shadow-sm">
//         <div className="container-fluid">
//           <button
//             className="btn btn-link text-white d-md-none"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             <Menu size={24} />
//           </button>
//           <span className="navbar-brand mb-0 h1">ඍණ අය කිරීමේ පද්ධතිය</span>
//           <div className="d-flex align-items-center">
//             <span className="text-white me-3 d-none d-md-inline">
//               {user?.name}
//             </span>
//             <span className="badge bg-light text-primary me-3">
//               {user?.roles?.join(", ")}
//             </span>
//             <button className="btn btn-outline-light btn-sm" onClick={logout}>
//               <LogOut size={18} className="me-1" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className="flex-grow-1 d-flex">
//         <div
//           className={`bg-white border-end ${
//             sidebarOpen ? "d-block" : "d-none"
//           } ${sidebarOpen ? "col-md-3 col-lg-2" : ""}`}
//           style={{ minHeight: "100%" }}
//         >
//           {sidebar}
//         </div>

//         <div className="flex-grow-1 p-4 bg-light">{content}</div>
//       </div>
//     </div>
//   );
// };

// // ==================== Dashboard Component ====================
// const Dashboard = () => {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("home");

//   const isSocietyAdmin = user?.roles?.includes("SOCIETY_ADMIN");
//   const isSocietyApproval = user?.roles?.includes("SOCIETY_APPROVAL");
//   const isDistrictAdmin = user?.roles?.includes("DISTRICT_ADMIN");
//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");
//   const isOfficer = user?.roles?.includes("OFFICER");
//   const isAdmin = isDistrictAdmin || isProvincialAdmin;

//   const NavItem = ({ id, icon: Icon, label }) => (
//     <button
//       className={`nav-link text-start w-100 ${
//         activeTab === id ? "active bg-primary text-white" : "text-dark"
//       }`}
//       onClick={() => setActiveTab(id)}
//     >
//       <Icon size={18} className="me-2" />
//       {label}
//     </button>
//   );

//   const sidebar = (
//     <div className="p-3">
//       <nav className="nav flex-column">
//         <NavItem id="home" icon={Home} label="Home" />

//         {isSocietyAdmin && (
//           <>
//             <NavItem
//               id="create-submission"
//               icon={FileText}
//               label="Create Submission"
//             />
//             <NavItem
//               id="my-submissions"
//               icon={FileText}
//               label="My Submissions"
//             />
//           </>
//         )}

//         {isSocietyApproval && (
//           <>
//             <NavItem
//               id="pending-approvals"
//               icon={Clock}
//               label="Pending Approvals"
//             />
//             <NavItem
//               id="approved-submissions"
//               icon={CheckCircle}
//               label="Approved Submissions"
//             />
//           </>
//         )}

//         {isOfficer && (
//           <>
//             <NavItem
//               id="my-borrowers"
//               icon={Users}
//               label="My Assigned Borrowers"
//             />
//           </>
//         )}

//         {isAdmin && (
//           <>
//             <NavItem
//               id="district-submissions"
//               icon={FileText}
//               label={
//                 isProvincialAdmin ? "All Submissions" : "District Submissions"
//               }
//             />
//             {isProvincialAdmin && (
//               <NavItem
//                 id="provincial-overview"
//                 icon={Building}
//                 label="Provincial Overview"
//               />
//             )}
//             <NavItem
//               id="manage-societies"
//               icon={Building}
//               label="Manage Societies"
//             />
//             <NavItem
//               id="manage-officers"
//               icon={Users}
//               label="Manage Officers"
//             />
//           </>
//         )}
//       </nav>
//     </div>
//   );

//   let content;
//   if (activeTab === "home") {
//     content = <HomePage user={user} />;
//   } else if (activeTab === "create-submission") {
//     content = <CreateSubmissionPage user={user} />;
//   } else if (activeTab === "my-submissions") {
//     content = <MySubmissionsPage user={user} />;
//   } else if (activeTab === "pending-approvals") {
//     content = <PendingApprovalsPage user={user} />;
//   } else if (activeTab === "approved-submissions") {
//     content = <ApprovedSubmissionsPage user={user} />;
//   } else if (activeTab === "my-borrowers") {
//     content = <OfficerBorrowersPage user={user} />;
//   } else if (activeTab === "district-submissions") {
//     content = <DistrictSubmissionsPage user={user} />;
//   } else if (activeTab === "provincial-overview") {
//     content = <ProvincialOverviewPage user={user} />;
//   } else if (activeTab === "manage-societies") {
//     content = <ManageSocietiesPage user={user} />;
//   } else if (activeTab === "manage-officers") {
//     content = <ManageOfficersPage user={user} />;
//   }

//   return <DashboardLayout sidebar={sidebar} content={content} />;
// };

// // ==================== Home Page ====================
// const HomePage = ({ user }) => (
//   <div>
//     <h2 className="mb-4">Welcome, {user?.name}!</h2>
//     <div className="row g-4">
//       <div className="col-md-4">
//         <div className="card border-0 shadow-sm h-100">
//           <div className="card-body">
//             <h5 className="card-title text-primary">
//               <Users size={20} className="me-2" />
//               Role
//             </h5>
//             <p className="card-text fs-5">{user?.roles?.join(", ")}</p>
//           </div>
//         </div>
//       </div>
//       {user?.district && (
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary">
//                 <Building size={20} className="me-2" />
//                 District
//               </h5>
//               <p className="card-text fs-5">{user?.district}</p>
//             </div>
//           </div>
//         </div>
//       )}
//       {user?.society && (
//         <div className="col-md-4">
//           <div className="card border-0 shadow-sm h-100">
//             <div className="card-body">
//               <h5 className="card-title text-primary">
//                 <Building size={20} className="me-2" />
//                 Society
//               </h5>
//               <p className="card-text fs-5">{user?.society}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

// // // ==================== Create Submission Page (Placeholder) ====================
// // const CreateSubmissionPage = ({ user }) => {
// //   return (
// //     <div>
// //       <h2 className="mb-4">Create New Submission</h2>
// //       <div className="alert alert-info">
// //         <AlertCircle size={18} className="me-2" />
// //         Create submission form here (same as before)
// //       </div>
// //     </div>
// //   );
// // };

// // // ==================== My Submissions Page (Placeholder) ====================
// // const MySubmissionsPage = ({ user }) => {
// //   return (
// //     <div>
// //       <h2 className="mb-4">My Submissions</h2>
// //       <div className="alert alert-info">
// //         <AlertCircle size={18} className="me-2" />
// //         My submissions list here (same as before)
// //       </div>
// //     </div>
// //   );
// // };

// // // ==================== Pending Approvals Page (Placeholder) ====================
// // const PendingApprovalsPage = ({ user }) => {
// //   return (
// //     <div>
// //       <h2 className="mb-4">Pending Approvals</h2>
// //       <div className="alert alert-info">
// //         <AlertCircle size={18} className="me-2" />
// //         Pending approvals list here (same as before)
// //       </div>
// //     </div>
// //   );
// // };

// // // ==================== Approved Submissions Page (Placeholder) ====================
// // const ApprovedSubmissionsPage = ({ user }) => {
// //   return (
// //     <div>
// //       <h2 className="mb-4">Approved Submissions</h2>
// //       <div className="alert alert-info">
// //         <AlertCircle size={18} className="me-2" />
// //         Approved submissions list here (same as before)
// //       </div>
// //     </div>
// //   );
// // };

// // ==================== Create Submission Page ====================
// const CreateSubmissionPage = ({ user }) => {
//   const [borrowers, setBorrowers] = useState([
//     {
//       id: Date.now(),
//       loanNumber: "",
//       borrowerName: "",
//       borrowerAddress: "",
//       membershipNo: "",
//       guarantor1Name: "",
//       guarantor1Address: "",
//       guarantor1MembershipNo: "",
//       guarantor2Name: "",
//       guarantor2Address: "",
//       guarantor2MembershipNo: "",
//       loanAmount: "",
//       interest: "",
//       interestRate: "",
//       stationeryFees: "",
//     },
//   ]);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const addBorrower = () => {
//     setBorrowers([
//       ...borrowers,
//       {
//         id: Date.now(),
//         loanNumber: "",
//         borrowerName: "",
//         borrowerAddress: "",
//         membershipNo: "",
//         guarantor1Name: "",
//         guarantor1Address: "",
//         guarantor1MembershipNo: "",
//         guarantor2Name: "",
//         guarantor2Address: "",
//         guarantor2MembershipNo: "",
//         loanAmount: "",
//         interest: "",
//         interestRate: "",
//         stationeryFees: "",
//       },
//     ]);
//   };

//   const removeBorrower = (id) => {
//     if (borrowers.length > 1) {
//       setBorrowers(borrowers.filter((b) => b.id !== id));
//     }
//   };

//   const updateBorrower = (id, field, value) => {
//     setBorrowers(
//       borrowers.map((b) => (b.id === id ? { ...b, [field]: value } : b))
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const submissionData = {
//         districtId: user.district,
//         societyId: user.society,
//         borrowers: borrowers.map(({ id, ...b }) => b),
//       };

//       await api.createSubmission(submissionData);
//       setSuccess("Submission created successfully and sent for approval!");

//       setBorrowers([
//         {
//           id: Date.now(),
//           loanNumber: "",
//           borrowerName: "",
//           borrowerAddress: "",
//           membershipNo: "",
//           guarantor1Name: "",
//           guarantor1Address: "",
//           guarantor1MembershipNo: "",
//           guarantor2Name: "",
//           guarantor2Address: "",
//           guarantor2MembershipNo: "",
//           loanAmount: "",
//           interest: "",
//           interestRate: "",
//           stationeryFees: "",
//         },
//       ]);

//       window.scrollTo(0, 0);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="mb-4">Create New Submission</h2>
//       <div className="alert alert-info mb-4">
//         <AlertCircle size={18} className="me-2" />
//         As Society Admin, you create borrower submissions. They will be sent to
//         Society Approval Officer for review.
//       </div>

//       {error && (
//         <div className="alert alert-danger">
//           <AlertCircle size={18} className="me-2" />
//           {error}
//         </div>
//       )}
//       {success && (
//         <div className="alert alert-success">
//           <CheckCircle size={18} className="me-2" />
//           {success}
//         </div>
//       )}

//       <form onSubmit={handleSubmit}>
//         {borrowers.map((borrower, index) => (
//           <div key={borrower.id} className="card mb-4 border-0 shadow-sm">
//             <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//               <h5 className="mb-0">Borrower {index + 1}</h5>
//               {borrowers.length > 1 && (
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-light"
//                   onClick={() => removeBorrower(borrower.id)}
//                 >
//                   <XCircle size={16} className="me-1" />
//                   Remove
//                 </button>
//               )}
//             </div>
//             <div className="card-body">
//               <div className="row g-3">
//                 <div className="col-md-6">
//                   <label className="form-label">Loan Number (ණය අංකය) *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.loanNumber}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanNumber", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-6">
//                   <label className="form-label">
//                     Borrower Name (ණය ගැනුම්කරුගේ නම) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.borrowerName}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerName",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-12">
//                   <label className="form-label">
//                     Borrower Address (ලිපිනය) *
//                   </label>
//                   <textarea
//                     className="form-control"
//                     rows="2"
//                     value={borrower.borrowerAddress}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "borrowerAddress",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Membership No *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.membershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "membershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">
//                     Guarantor 1 Name (ඇපකරු 1) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Guarantor 1 Membership *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor1MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor1MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">
//                     Guarantor 2 Name (ඇපකරු 2) *
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2Name}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2Name",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-4">
//                   <label className="form-label">Guarantor 2 Membership *</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={borrower.guarantor2MembershipNo}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "guarantor2MembershipNo",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Loan Amount (ණය මුදල) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.loanAmount}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "loanAmount", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Interest (පොළිය) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interest}
//                     onChange={(e) =>
//                       updateBorrower(borrower.id, "interest", e.target.value)
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Interest Rate (%) *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.interestRate}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "interestRate",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//                 <div className="col-md-3">
//                   <label className="form-label">Stationery Fees *</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     value={borrower.stationeryFees}
//                     onChange={(e) =>
//                       updateBorrower(
//                         borrower.id,
//                         "stationeryFees",
//                         e.target.value
//                       )
//                     }
//                     required
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}

//         <div className="d-flex gap-2">
//           <button
//             type="button"
//             className="btn btn-secondary"
//             onClick={addBorrower}
//           >
//             <FileText size={18} className="me-1" />
//             Add Another Borrower
//           </button>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? (
//               <>
//                 <span className="spinner-border spinner-border-sm me-2" />
//                 Submitting...
//               </>
//             ) : (
//               <>
//                 <CheckCircle size={18} className="me-1" />
//                 Submit for Society Approval
//               </>
//             )}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// // ==================== My Submissions Page ====================
// const MySubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadSubmissions();
//   }, []);

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">My Submissions</h2>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           No submissions found
//         </div>
//       ) : (
//         <div className="card border-0 shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Date</th>
//                   <th>Borrowers</th>
//                   <th>Status</th>
//                   <th>Submitted By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((s) => (
//                   <tr key={s.id}>
//                     <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {s.borrowers.length} borrowers
//                       </span>
//                     </td>
//                     <td>
//                       <span
//                         className={`badge bg-${
//                           s.status === "approved"
//                             ? "success"
//                             : s.status === "rejected"
//                             ? "danger"
//                             : "warning"
//                         }`}
//                       >
//                         {s.status}
//                       </span>
//                     </td>
//                     <td>{s.submittedBy}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <FileText size={16} className="me-1" />
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Pending Approvals Page ====================
// const PendingApprovalsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   useEffect(() => {
//     loadPendingSubmissions();
//   }, []);

//   const loadPendingSubmissions = async () => {
//     try {
//       const data = await api.getPendingApprovalsBySociety(user.society);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleApprove = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to approve this submission? It will be sent to District Office."
//       )
//     )
//       return;

//     setActionLoading(true);
//     try {
//       await api.approveSubmission(id);
//       alert("Submission approved and sent to District Office successfully!");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleReject = async (id) => {
//     const reason = window.prompt("Enter rejection reason:");
//     if (!reason) return;

//     setActionLoading(true);
//     try {
//       await api.rejectSubmission(id, reason);
//       alert("Submission rejected");
//       loadPendingSubmissions();
//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Pending Approvals</h2>
//       <div className="alert alert-info mb-4">
//         <Clock size={18} className="me-2" />
//         Review and approve submissions created by Society Admin. Approved
//         submissions will be sent to District Office.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-warning">
//           <Clock size={18} className="me-2" />
//           No pending approvals
//         </div>
//       ) : (
//         <div className="row">
//           {submissions.map((s) => (
//             <div key={s.id} className="col-12 mb-3">
//               <div className="card border-0 shadow-sm">
//                 <div className="card-header bg-warning bg-opacity-10">
//                   <h5 className="mb-0">
//                     <Clock size={20} className="me-2" />
//                     Submission from{" "}
//                     {new Date(s.submittedDate).toLocaleDateString()}
//                   </h5>
//                 </div>
//                 <div className="card-body">
//                   <div className="row mb-3">
//                     <div className="col-md-6">
//                       <strong>Borrowers:</strong> {s.borrowers.length}
//                     </div>
//                     <div className="col-md-6">
//                       <strong>Submitted by:</strong> {s.submittedBy}
//                     </div>
//                   </div>

//                   <div className="table-responsive mb-3">
//                     <table className="table table-sm table-bordered">
//                       <thead className="table-light">
//                         <tr>
//                           <th>Borrower Name</th>
//                           <th>Loan No</th>
//                           <th>Amount</th>
//                           <th>Interest</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {s.borrowers.map((b, idx) => (
//                           <tr key={idx}>
//                             <td>{b.borrowerName}</td>
//                             <td>{b.loanNumber}</td>
//                             <td>Rs. {b.loanAmount}</td>
//                             <td>Rs. {b.interest}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </table>
//                   </div>

//                   <div className="d-flex gap-2">
//                     <button
//                       className="btn btn-success"
//                       onClick={() => handleApprove(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <CheckCircle size={18} className="me-1" />
//                       Approve & Send to District
//                     </button>
//                     <button
//                       className="btn btn-danger"
//                       onClick={() => handleReject(s.id)}
//                       disabled={actionLoading}
//                     >
//                       <XCircle size={18} className="me-1" />
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Approved Submissions Page ====================
// const ApprovedSubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadApprovedSubmissions();
//   }, []);

//   const loadApprovedSubmissions = async () => {
//     try {
//       const data = await api.getSubmissionsBySociety(user.society);
//       const approved = data.filter((s) => s.status === "approved");
//       setSubmissions(approved);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Approved Submissions</h2>
//       <div className="alert alert-success mb-4">
//         <CheckCircle size={18} className="me-2" />
//         These submissions have been approved and sent to District Office for
//         processing.
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           No approved submissions yet
//         </div>
//       ) : (
//         <div className="card border-0 shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>Submission Date</th>
//                   <th>Borrowers</th>
//                   <th>Submitted By</th>
//                   <th>Approved Date</th>
//                   <th>Approved By</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {submissions.map((s) => (
//                   <tr key={s.id}>
//                     <td>{new Date(s.submittedDate).toLocaleDateString()}</td>
//                     <td>
//                       <span className="badge bg-secondary">
//                         {s.borrowers.length} borrowers
//                       </span>
//                     </td>
//                     <td>{s.submittedBy}</td>
//                     <td>
//                       {s.approvedDate
//                         ? new Date(s.approvedDate).toLocaleDateString()
//                         : "-"}
//                     </td>
//                     <td>{s.approvedBy || "-"}</td>
//                     <td>
//                       <button className="btn btn-sm btn-outline-primary">
//                         <FileText size={16} className="me-1" />
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== NEW: Officer Borrowers Page ====================
// const OfficerBorrowersPage = ({ user }) => {
//   const [borrowers, setBorrowers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedBorrower, setExpandedBorrower] = useState(null);
//   const [showDecisionModal, setShowDecisionModal] = useState(false);
//   const [selectedBorrower, setSelectedBorrower] = useState(null);
//   const [decisionData, setDecisionData] = useState({
//     decisionDate: "",
//     finalLoanAmount: "",
//     interestDeducted: "",
//     arbitrationDecision: "",
//   });

//   useEffect(() => {
//     loadBorrowers();
//   }, []);

//   const loadBorrowers = async () => {
//     try {
//       const data = await api.getOfficerAssignedBorrowers();
//       setBorrowers(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openDecisionModal = (borrower) => {
//     setSelectedBorrower(borrower);
//     setShowDecisionModal(true);
//     setDecisionData({
//       decisionDate: new Date().toISOString().split("T")[0],
//       finalLoanAmount: borrower.loanAmount || "",
//       interestDeducted: "",
//       arbitrationDecision: "",
//     });
//   };

//   const submitDecision = async () => {
//     if (
//       !decisionData.decisionDate ||
//       !decisionData.finalLoanAmount ||
//       !decisionData.interestDeducted ||
//       !decisionData.arbitrationDecision
//     ) {
//       alert("කරුණාකර සියලු තොරතුරු පුරවන්න");
//       return;
//     }

//     try {
//       await api.addArbitrationDecision(
//         selectedBorrower.submissionId,
//         selectedBorrower.borrowerId,
//         decisionData
//       );
//       alert("තීරණය සාර්ථකව එකතු කරන ලදී!");
//       setShowDecisionModal(false);
//       loadBorrowers();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   //   const generateLetter = (borrower) => {
//   //     const currentDate = new Date().toLocaleDateString("si-LK");
//   //     const totalAmount =
//   //       parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

//   //     const letterHTML = `
//   // <!DOCTYPE html>
//   // <html>
//   // <head>
//   //     <meta charset="utf-8">
//   //     <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
//   //     <style>
//   //         @page {
//   //             size: A4;
//   //             margin: 2cm;
//   //         }
//   //         body {
//   //             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
//   //             font-size: 11pt;
//   //             line-height: 1.5;
//   //             color: #000;
//   //         }
//   //         .page-border {
//   //             border: 2px solid #000;
//   //             padding: 25px;
//   //             min-height: 27cm;
//   //         }
//   //         .header-logo {
//   //             text-align: right;
//   //             font-size: 9pt;
//   //             font-style: italic;
//   //             color: #666;
//   //             margin-bottom: 15px;
//   //         }
//   //         .header-title {
//   //             text-align: center;
//   //             font-size: 12pt;
//   //             font-weight: bold;
//   //             margin-bottom: 20px;
//   //         }
//   //         .ref-text {
//   //             font-size: 10pt;
//   //             text-align: justify;
//   //             margin-bottom: 10px;
//   //             line-height: 1.4;
//   //         }
//   //         .main-section {
//   //             margin-top: 20px;
//   //         }
//   //         .to-section {
//   //             margin: 20px 0;
//   //         }
//   //         .content-para {
//   //             text-align: justify;
//   //             margin-bottom: 12px;
//   //             line-height: 1.6;
//   //         }
//   //         .details-section {
//   //             margin: 20px 0 20px 40px;
//   //             line-height: 2;
//   //         }
//   //         .signature-section {
//   //             margin-top: 60px;
//   //         }
//   //         .footer-note {
//   //             margin-top: 30px;
//   //             font-size: 9pt;
//   //             font-style: italic;
//   //             line-height: 1.4;
//   //         }
//   //         .filled-data {
//   //             font-weight: bold;
//   //         }
//   //     </style>
//   // </head>
//   // <body>
//   //     <div class="page-border">
//   //         <div class="header-logo">
//   //             තීරක අංකය: <span class="filled-data">${
//   //               borrower.arbitrationNumber || "..........................."
//   //             }</span>
//   //         </div>

//   //         <div class="header-title">
//   //             ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
//   //         </div>

//   //         <div class="ref-text">
//   //             1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
//   //             දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
//   //             වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව අංක <span class="filled-data">${
//   //               borrower.registrationNo || "............................."
//   //             }</span> දරණ ගැසට් පත්‍රයේ
//   //             ප්‍රකාශිත සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස් <span class="filled-data">${
//   //               borrower.assignedOfficer
//   //             }</span>
//   //         </div>

//   //         <div class="ref-text">
//   //             දරණ ගැසට් පත්‍රයේ සඳු කරන ලද නිවේදනයෙන් මා වෙත පවරන ලද නිධන වශයෙන් මධ්‍යම පළාතේ
//   //             ලියාපදිංචි කරු වශයෙන් ලියාපදිංචි සමුපකාර සමිතියක් වන <span class="filled-data">${
//   //               society.name
//   //             }</span> සමිතිය
//   //             හා විත්තිකරුවන් වශයෙන් ඊ සමිතියේ සාමාජිකයින් වන ණයකරුවෝ <span class="filled-data">${
//   //               borrower.borrowerName
//   //             }</span> සහ ඇපකරුවෝ නම්
//   //             <span class="filled-data">${
//   //               borrower.guarantor1Name
//   //             }</span> සහ <span class="filled-data">${
//   //       borrower.guarantor2Name
//   //     }</span> ගෙන් සහ ඇපකාර,
//   //             අතර ණය මුදල වශයෙන්
//   //         </div>

//   //         <div class="main-section">
//   //             <div class="to-section">
//   //                 රු. <span class="filled-data">${parseFloat(
//   //                   borrower.loanAmount
//   //                 ).toLocaleString("si-LK")}</span>
//   //             </div>

//   //             <div class="content-para">
//   //                 සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
//   //                   borrower.loanNumber
//   //                 }</span> වන තුරු අවුරුදු ගණන මුළු මුදල
//   //                 <span class="filled-data">${totalAmount.toLocaleString(
//   //                   "si-LK"
//   //                 )}</span> තේපල ප්‍රතිශතයක් <span class="filled-data">${
//   //       borrower.interestRate
//   //     }%</span> දී ණය දුන් දිනයෙන් සිට මුළු මුදල ගෙවා නිම කරන්නා වන
//   //                 තුරු මුල් මුදලට අදුනා ගත යුතු පොළියක්, සමුපකාර සමිතියට අයවිය යුතු වශයෙන් පැන ඇති බවට ආරවුල
//   //                 නිසා අනු අතිහීමක් යටතේ වූ වෙත ඉදිරිපත් කරන ලදින්, එහි ආරවුල තීරණය කිරීමට තීරණ තාවක්කාරු
//   //                 දීම සඳහා ආරවුල් බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
//   //                   borrower.assignedOfficer
//   //                 }</span>
//   //                 මහතා / මිය මෙයින් පත් කරමි.
//   //             </div>

//   //             <div style="margin-top: 30px;">
//   //                 <div>මධ්‍ය පළාත් සමුපකාර සංවර්ධන දෙපාර්තුමේන්තුව</div>
//   //                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්</div>
//   //                 <div><span class="filled-data">${district.name}</span>,</div>
//   //             </div>

//   //             <div style="margin-top: 30px;">
//   //                 <div>දිනය</div>
//   //                 <div><span class="filled-data">${currentDate}</span></div>
//   //             </div>

//   //             <div class="signature-section">
//   //                 <div>...........................................................</div>
//   //                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් /</div>
//   //                 <div>නියෝජ්‍ය කොමසාරිස්</div>
//   //             </div>

//   //             <div class="footer-note">
//   //                 * ආරවුලේ වන් පාර්ශවයක් ඇපකරුවෙකු නොවන අඩ වගන්තිය තහවුරු කර පිහි සම්පූර්ණ නම් සඳහන් කරන්න.
//   //             </div>

//   //             <div class="footer-note">
//   //                 එහි පැවතරුන්ගේ හෝ විත්තිකාරන්ගේ තත්වය දැක්වන, එනම් ලියාපදිංචි කරන ලද සමිතියක හෝ හිටපු
//   //                 සාමාජිකයෙකු හෝ හිටපු / මියගිය ) සාමාජිකයෙකු විත්තිකරුවෙකු හෝ හිටපු කාරක සභාව අධිකාරියෙකු /
//   //                 සේවකයෙකු හෝ මියගිය අධිකාරියෙකු / සේවකයෙකු නීත්‍යානුකූල නියෝජිතයෙකු / උරුමක්කාරයෙකු /
//   //                 බාල වයස්කාරයෙකු උරුමක්කාරයෙකුගේ භාරකාරයෙකු හෝ යනාදී යම් පාර්ශවයක් ඇපකරුවෙකු වන විට ලියාපදිංචි
//   //                 ඇපකරුවෙකු යනුවෙන්ද සඳහන් කළ යුතුය.
//   //             </div>
//   //         </div>
//   //     </div>
//   // </body>
//   // </html>
//   //     `;

//   //     const blob = new Blob(["\ufeff", letterHTML], {
//   //       type: "application/msword",
//   //     });

//   //     const url = URL.createObjectURL(blob);
//   //     const link = document.createElement("a");
//   //     link.href = url;
//   //     link.download = `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
//   //     URL.revokeObjectURL(url);

//   //     alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
//   //   };
//   const generateLetter = (borrower, submission) => {
//     const currentDate = new Date().toLocaleDateString("si-LK");
//     const totalAmount =
//       parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

//     const letterHTML = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
//     <style>
//         @page {
//             size: A4;
//             margin: 2cm;
//         }
//         body {
//             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
//             font-size: 11pt;
//             line-height: 1.5;
//             color: #000;
//         }
//         .page-border {
//             border: 2px solid #000;
//             padding: 25px;
//             min-height: 27cm;
//         }
//         .header-logo {
//             text-align: right;
//             font-size: 9pt;
//             font-style: italic;
//             color: #666;
//             margin-bottom: 15px;
//         }
//         .header-title {
//             text-align: center;
//             font-size: 12pt;
//             font-weight: bold;
//             margin-bottom: 20px;
//         }
//         .ref-text {
//             font-size: 10pt;
//             text-align: justify;
//             margin-bottom: 10px;
//             line-height: 1.4;
//         }
//         .main-section {
//             margin-top: 20px;
//         }
//         .to-section {
//             margin: 20px 0;
//         }
//         .content-para {
//             text-align: justify;
//             margin-bottom: 12px;
//             line-height: 1.6;
//         }
//         .details-section {
//             margin: 20px 0 20px 40px;
//             line-height: 2;
//         }
//         .signature-section {
//             margin-top: 60px;
//         }
//         .footer-note {
//             margin-top: 30px;
//             font-size: 9pt;
//             font-style: italic;
//             line-height: 1.4;
//         }
//         .filled-data {
//             font-weight: bold;
//         }
//     </style>
// </head>
// <body>
//     <div class="page-border">
//         <div class="header-logo">
//             තීරක අංකය: <span class="filled-data">${
//               borrower.arbitrationNumber || "..........................."
//             }</span>
//         </div>

//         <div class="header-title">
//             ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
//         </div>

//         <div class="ref-text">
//             1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
//             දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
//             වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව
//         </div>

//         <div class="ref-text">
//             දරණ ගැසට් පත්‍රයේ සඳහන් කරන ලද නිවේදනයෙන් මා වෙත පවරන ලද බලය අනුව ණයකරුවෝ <span class="filled-data">${
//               borrower.borrowerName
//             }</span> සහ ඇපකරුවෝ නම්
//             <span class="filled-data">${
//               borrower.guarantor1Name
//             }</span> සහ <span class="filled-data">${
//       borrower.guarantor2Name
//     }</span> අතර ණය මුදල වශයෙන්
//         </div>

//         <div class="main-section">
//             <div class="to-section">
//                 රු. <span class="filled-data">${parseFloat(
//                   borrower.loanAmount
//                 ).toLocaleString("si-LK")}</span>
//             </div>

//             <div class="content-para">
//                 සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
//                   borrower.loanNumber
//                 }</span> වන තුරු මුළු මුදල
//                 <span class="filled-data">රු. ${totalAmount.toLocaleString(
//                   "si-LK"
//                 )}</span> පොලී ප්‍රතිශතයක් <span class="filled-data">${
//       borrower.interestRate
//     }%</span>

//                 සම්බන්ධයෙන් පවතින තීරණය කිරීමට තීරණ තාවක්කාරු
//                 දීම සඳහා ආරවුල් බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
//                   borrower.assignedOfficerName
//                 }</span>
//                 මහතා / මිය මෙයින් පත් කරමි.
//             </div>

//             <div style="margin-top: 30px;">
//                 <div>දිනය: <span class="filled-data">${currentDate}</span></div>
//             </div>

//             <div class="signature-section">
//                 <div>...........................................................</div>
//                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් /</div>
//                 <div>නියෝජ්‍ය කොමසාරිස්</div>
//             </div>

//             <div class="footer-note">
//                 * ආරවුලේ එක් පාර්ශවයක් ඇපකරුවෙකු නොවන අවස්ථාවේදී ඒ වගන්තිය තහවුරු කර එහි සම්පූර්ණ නම් සඳහන් කරන්න.
//             </div>

//             <div class="footer-note">
//                 එහි පැවතුන්ගේ හෝ විත්තිකරුවන්ගේ තත්වය දැක්වන, එනම් ලියාපදිංචි කරන ලද සමිතියක හෝ හිටපු
//                 සාමාජිකයෙකු හෝ හිටපු / මියගිය සාමාජිකයෙකු විත්තිකරුවෙකු හෝ හිටපු කාරක සභාව අධිකාරියෙකු /
//                 සේවකයෙකු හෝ මියගිය අධිකාරියෙකු / සේවකයෙකු නීත්‍යානුකූල නියෝජිතයෙකු / උරුමක්කාරයෙකු /
//                 බාල වයස්කාරයෙකුගේ භාරකාරයෙකු හෝ යනාදී යම් පාර්ශවයක් ඇපකරුවෙකු වන විට ලියාපදිංචි
//                 ඇපකරුවෙකු යනුවෙන්ද සඳහන් කළ යුතුය.
//             </div>
//         </div>
//     </div>
// </body>
// </html>
//     `;

//     const blob = new Blob(["\ufeff", letterHTML], {
//       type: "application/msword",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
//   };
//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2 className="mb-4">මාගේ පවරා ඇති ණයගැතියන්</h2>
//       <div className="alert alert-info mb-4">
//         <CheckCircle size={18} className="me-2" />
//         ඔබට පවරා ඇති ණයගැතියන් සඳහා තීරණ එකතු කරන්න
//       </div>

//       {borrowers.length === 0 ? (
//         <div className="alert alert-warning">
//           <AlertCircle size={18} className="me-2" />
//           ඔබට තවම ණයගැතියන් පවරා නැත
//         </div>
//       ) : (
//         <div className="card shadow-sm">
//           <div className="table-responsive">
//             <table className="table table-bordered table-hover mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>ණය අංකය</th>
//                   <th>නම</th>
//                   <th>ලිපිනය</th>
//                   <th>ණය මුදල</th>
//                   <th>පොලිය</th>
//                   <th>බේරුම් අංකය</th>
//                   <th>තත්වය</th>
//                   <th>තීරණය</th>
//                   <th>ලිපිය</th>
//                   <th>විස්තර</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {borrowers.map((borrower) => (
//                   <React.Fragment key={borrower.borrowerId}>
//                     <tr>
//                       <td>{borrower.loanNumber}</td>
//                       <td>
//                         <strong>{borrower.borrowerName}</strong>
//                       </td>
//                       <td>{borrower.borrowerAddress}</td>
//                       <td>
//                         රු.{" "}
//                         {parseFloat(borrower.loanAmount).toLocaleString(
//                           "si-LK"
//                         )}
//                       </td>
//                       <td>
//                         රු.{" "}
//                         {parseFloat(borrower.interest).toLocaleString("si-LK")}
//                       </td>
//                       <td className="fw-bold text-primary">
//                         {borrower.arbitrationNumber}
//                       </td>
//                       <td>
//                         {borrower.status === "assigned" && (
//                           <span className="badge bg-warning">පවරා ඇත</span>
//                         )}
//                         {borrower.status === "decision-given" && (
//                           <span className="badge bg-success">
//                             තීරණය ලබා දී ඇත
//                           </span>
//                         )}
//                       </td>
//                       <td className="text-center">
//                         {borrower.status === "assigned" &&
//                           !borrower.arbitrationDecision && (
//                             <button
//                               onClick={() => openDecisionModal(borrower)}
//                               className="btn btn-info btn-sm"
//                             >
//                               තීරණය එකතු කරන්න
//                             </button>
//                           )}
//                         {borrower.arbitrationDecision && (
//                           <span className="badge bg-success">
//                             <CheckCircle size={14} className="me-1" />
//                             තීරණය දී ඇත
//                           </span>
//                         )}
//                       </td>
//                       <td className="text-center">
//                         <button
//                           onClick={() => generateLetter(borrower)}
//                           className="btn btn-primary btn-sm"
//                         >
//                           <FileText size={14} className="me-1" />
//                           ලිපිය
//                         </button>
//                       </td>
//                       <td>
//                         <button
//                           onClick={() =>
//                             setExpandedBorrower(
//                               expandedBorrower === borrower.borrowerId
//                                 ? null
//                                 : borrower.borrowerId
//                             )
//                           }
//                           className="btn btn-info btn-sm"
//                         >
//                           <FileText size={14} className="me-1" />
//                           විස්තර
//                         </button>
//                       </td>
//                     </tr>
//                     {expandedBorrower === borrower.borrowerId && (
//                       <tr>
//                         <td colSpan="10" className="bg-light">
//                           <div className="row g-3 p-3">
//                             <div className="col-md-6">
//                               <div className="card">
//                                 <div className="card-body">
//                                   <h6 className="card-title text-primary border-bottom pb-2">
//                                     ණයගැතියාගේ සම්පූර්ණ තොරතුරු
//                                   </h6>
//                                   <p className="mb-1">
//                                     <strong>නම:</strong> {borrower.borrowerName}
//                                   </p>
//                                   <p className="mb-1">
//                                     <strong>ලිපිනය:</strong>{" "}
//                                     {borrower.borrowerAddress}
//                                   </p>
//                                   <p className="mb-0">
//                                     <strong>සාමාජික අංකය:</strong>{" "}
//                                     {borrower.membershipNo}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="col-md-6">
//                               <div className="card">
//                                 <div className="card-body">
//                                   <h6 className="card-title text-success border-bottom pb-2">
//                                     ණය විස්තර
//                                   </h6>
//                                   <p className="mb-1">
//                                     <strong>ණය මුදල:</strong> රු.{" "}
//                                     {parseFloat(
//                                       borrower.loanAmount
//                                     ).toLocaleString("si-LK")}
//                                   </p>
//                                   <p className="mb-1">
//                                     <strong>පොලිය:</strong> රු.{" "}
//                                     {parseFloat(
//                                       borrower.interest
//                                     ).toLocaleString("si-LK")}
//                                   </p>
//                                   <p className="mb-0">
//                                     <strong>පොලී අනුපාතය:</strong>{" "}
//                                     {borrower.interestRate}%
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="col-md-6">
//                               <div className="card">
//                                 <div className="card-body">
//                                   <h6 className="card-title text-info border-bottom pb-2">
//                                     පළමු ඇපකරු
//                                   </h6>
//                                   <p className="mb-0">
//                                     <strong>නම:</strong>{" "}
//                                     {borrower.guarantor1Name}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                             <div className="col-md-6">
//                               <div className="card">
//                                 <div className="card-body">
//                                   <h6 className="card-title text-info border-bottom pb-2">
//                                     දෙවන ඇපකරු
//                                   </h6>
//                                   <p className="mb-0">
//                                     <strong>නම:</strong>{" "}
//                                     {borrower.guarantor2Name}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                             {borrower.arbitrationDecision && (
//                               <div className="col-12">
//                                 <div className="card border-success">
//                                   <div className="card-body">
//                                     <h6 className="card-title text-success border-bottom pb-2">
//                                       තීරණ විස්තර
//                                     </h6>
//                                     <p className="mb-1">
//                                       <strong>තීරණ දිනය:</strong>{" "}
//                                       {new Date(
//                                         borrower.decisionDate
//                                       ).toLocaleDateString("si-LK")}
//                                     </p>
//                                     <p className="mb-1">
//                                       <strong>ලැබුණු ණය මුදල:</strong> රු.{" "}
//                                       {parseFloat(
//                                         borrower.finalLoanAmount
//                                       ).toLocaleString("si-LK")}
//                                     </p>
//                                     <p className="mb-1">
//                                       <strong>අඩු කළ පොලිය:</strong> රු.{" "}
//                                       {parseFloat(
//                                         borrower.interestDeducted
//                                       ).toLocaleString("si-LK")}
//                                     </p>
//                                     <p className="mb-0">
//                                       <strong>තීරණය:</strong>{" "}
//                                       {borrower.arbitrationDecision}
//                                     </p>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     )}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Decision Modal */}
//       {showDecisionModal && (
//         <>
//           <div
//             className="modal-backdrop show"
//             style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
//           ></div>
//           <div
//             className="modal show d-block"
//             style={{ zIndex: 1055 }}
//             tabIndex="-1"
//           >
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div
//                 className="modal-content shadow-lg"
//                 style={{ border: "none", borderRadius: "15px" }}
//               >
//                 <div
//                   className="modal-header"
//                   style={{
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     color: "white",
//                     borderRadius: "15px 15px 0 0",
//                   }}
//                 >
//                   <h5 className="modal-title">
//                     <CheckCircle size={20} className="me-2" />
//                     බේරුම්කරු තීරණය එකතු කරන්න
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowDecisionModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body p-4">
//                   <div className="row g-4">
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <Calendar size={16} className="me-2 text-primary" />
//                         ණය ලබා දුන් අවසාන දිනය *
//                       </label>
//                       <input
//                         type="date"
//                         className="form-control form-control-lg"
//                         value={decisionData.decisionDate}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             decisionDate: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <DollarSign size={16} className="me-2 text-success" />
//                         ලැබුණු ණය මුදල (රු.) *
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control form-control-lg"
//                         placeholder="0.00"
//                         value={decisionData.finalLoanAmount}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             finalLoanAmount: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label fw-bold">
//                         <Percent size={16} className="me-2 text-warning" />
//                         අඩු කළ පොලිය (රු.) *
//                       </label>
//                       <input
//                         type="number"
//                         className="form-control form-control-lg"
//                         placeholder="0.00"
//                         value={decisionData.interestDeducted}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             interestDeducted: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       />
//                     </div>
//                     <div className="col-12">
//                       <label className="form-label fw-bold">
//                         <FileText size={16} className="me-2 text-info" />
//                         බේරුම්කරුගේ තීරණය / සටහන් *
//                       </label>
//                       <textarea
//                         className="form-control form-control-lg"
//                         rows="4"
//                         placeholder="තීරණය හෝ සටහන් මෙහි ඇතුළත් කරන්න..."
//                         value={decisionData.arbitrationDecision}
//                         onChange={(e) =>
//                           setDecisionData({
//                             ...decisionData,
//                             arbitrationDecision: e.target.value,
//                           })
//                         }
//                         style={{ borderRadius: "10px" }}
//                       ></textarea>
//                     </div>
//                   </div>
//                   <div
//                     className="alert alert-info mt-4 mb-0"
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <AlertCircle size={16} className="me-2" />
//                     <small>
//                       සියලු තාරකා (*) සලකුණු කළ ක්ෂේත්‍ර පුරවීම අනිවාර්ය වේ
//                     </small>
//                   </div>
//                 </div>
//                 <div
//                   className="modal-footer"
//                   style={{ borderTop: "2px solid #f0f0f0" }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-secondary btn-lg px-4"
//                     onClick={() => setShowDecisionModal(false)}
//                     style={{ borderRadius: "10px" }}
//                   >
//                     <XCircle size={16} className="me-2" />
//                     අවලංගු කරන්න
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-primary btn-lg px-4"
//                     onClick={submitDecision}
//                     style={{
//                       borderRadius: "10px",
//                       background:
//                         "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                       border: "none",
//                     }}
//                   >
//                     <CheckCircle size={16} className="me-2" />
//                     තීරණය සුරකින්න
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// // ==================== Provincial Overview (Placeholder) ====================
// const ProvincialOverviewPage = ({ user }) => {
//   return (
//     <div>
//       <h2 className="mb-4">පළාත් කාර්යාල පාලන පුවරුව</h2>
//       <div className="alert alert-info">
//         <AlertCircle size={18} className="me-2" />
//         Provincial overview statistics here
//       </div>
//     </div>
//   );
// };

// // // ==================== Manage Societies Page ====================
// // const ManageSocietiesPage = ({ user }) => {
// //   const [societies, setSocieties] = useState([]);
// //   const [districts, setDistricts] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     districtId: user.district || "",
// //     registrationNo: "",
// //     registeredAddress: "",
// //   });
// //   const [loading, setLoading] = useState(true);

// //   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

// //   useEffect(() => {
// //     loadData();
// //   }, []);

// //   const loadData = async () => {
// //     try {
// //       const districtsData = await api.getDistricts();
// //       setDistricts(districtsData);

// //       if (isProvincialAdmin) {
// //         // Load all societies
// //         const allSocieties = await api.getSocieties();
// //         setSocieties(allSocieties);
// //       } else if (user.district) {
// //         // Load district societies
// //         const societiesData = await api.getSocietiesByDistrict(user.district);
// //         setSocieties(societiesData);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await api.createSociety(formData);
// //       alert("Society created successfully!");
// //       setShowModal(false);
// //       setFormData({
// //         name: "",
// //         districtId: user.district || "",
// //         registrationNo: "",
// //         registeredAddress: "",
// //       });
// //       loadData();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-5">
// //         <div className="spinner-border text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2>Manage Societies</h2>
// //         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
// //           <Building size={18} className="me-1" />
// //           Add Society
// //         </button>
// //       </div>

// //       <div className="card border-0 shadow-sm">
// //         <div className="table-responsive">
// //           <table className="table table-hover mb-0">
// //             <thead className="table-light">
// //               <tr>
// //                 <th>Society Name</th>
// //                 {isProvincialAdmin && <th>District</th>}
// //                 <th>Registration No</th>
// //                 <th>Address</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {societies.map((s) => (
// //                 <tr key={s.id}>
// //                   <td>
// //                     <strong>{s.name}</strong>
// //                   </td>
// //                   {isProvincialAdmin && (
// //                     <td>{s.districtName || s.districtId}</td>
// //                   )}
// //                   <td>{s.registrationNo}</td>
// //                   <td>{s.registeredAddress}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div
// //           className="modal show d-block"
// //           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
// //         >
// //           <div className="modal-dialog">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Add New Society</h5>
// //                 <button
// //                   type="button"
// //                   className="btn-close"
// //                   onClick={() => setShowModal(false)}
// //                 ></button>
// //               </div>
// //               <form onSubmit={handleSubmit}>
// //                 <div className="modal-body">
// //                   <div className="mb-3">
// //                     <label className="form-label">Society Name *</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       value={formData.name}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, name: e.target.value })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label className="form-label">District *</label>
// //                     <select
// //                       className="form-select"
// //                       value={formData.districtId}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, districtId: e.target.value })
// //                       }
// //                       required
// //                       disabled={!isProvincialAdmin}
// //                     >
// //                       <option value="">Select District</option>
// //                       {districts.map((d) => (
// //                         <option key={d.id} value={d.id}>
// //                           {d.name}
// //                         </option>
// //                       ))}
// //                     </select>
// //                   </div>
// //                   <div className="mb-3">
// //                     <label className="form-label">Registration No</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       value={formData.registrationNo}
// //                       onChange={(e) =>
// //                         setFormData({
// //                           ...formData,
// //                           registrationNo: e.target.value,
// //                         })
// //                       }
// //                     />
// //                   </div>
// //                   <div className="mb-3">
// //                     <label className="form-label">Registered Address</label>
// //                     <textarea
// //                       className="form-control"
// //                       rows="3"
// //                       value={formData.registeredAddress}
// //                       onChange={(e) =>
// //                         setFormData({
// //                           ...formData,
// //                           registeredAddress: e.target.value,
// //                         })
// //                       }
// //                     ></textarea>
// //                   </div>
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={() => setShowModal(false)}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button type="submit" className="btn btn-primary">
// //                     Create Society
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ==================== Manage Officers Page ====================
// // const ManageOfficersPage = ({ user }) => {
// //   const [officers, setOfficers] = useState([]);
// //   const [districts, setDistricts] = useState([]);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     districtId: user.district || "",
// //   });
// //   const [loading, setLoading] = useState(true);

// //   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

// //   useEffect(() => {
// //     loadOfficers();
// //     loadDistricts();
// //   }, []);

// //   const loadDistricts = async () => {
// //     try {
// //       const data = await api.getDistricts();
// //       setDistricts(data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const loadOfficers = async () => {
// //     try {
// //       if (isProvincialAdmin) {
// //         // Load officers from all districts
// //         const districtsData = await api.getDistricts();
// //         const allOfficers = [];
// //         for (const district of districtsData) {
// //           const districtOfficers = await api.getOfficersByDistrict(district.id);
// //           allOfficers.push(
// //             ...districtOfficers.map((o) => ({
// //               ...o,
// //               districtName: district.name,
// //             }))
// //           );
// //         }
// //         setOfficers(allOfficers);
// //       } else {
// //         const data = await api.getOfficersByDistrict(user.district);
// //         setOfficers(data);
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await api.createOfficer(formData);
// //       alert("Officer created successfully!");
// //       setShowModal(false);
// //       setFormData({ name: "", districtId: user.district || "" });
// //       loadOfficers();
// //     } catch (err) {
// //       alert(err.message);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center py-5">
// //         <div className="spinner-border text-primary" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div>
// //       <div className="d-flex justify-content-between align-items-center mb-4">
// //         <h2>Manage Arbitration Officers</h2>
// //         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
// //           <Users size={18} className="me-1" />
// //           Add Officer
// //         </button>
// //       </div>

// //       <div className="card border-0 shadow-sm">
// //         <div className="table-responsive">
// //           <table className="table table-hover mb-0">
// //             <thead className="table-light">
// //               <tr>
// //                 <th>Officer Name</th>
// //                 {isProvincialAdmin && <th>District</th>}
// //                 <th>User Account</th>
// //                 <th>Status</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {officers.map((o) => (
// //                 <tr key={o.id}>
// //                   <td>
// //                     <strong>{o.name}</strong>
// //                   </td>
// //                   {isProvincialAdmin && (
// //                     <td>{o.districtName || o.districtId}</td>
// //                   )}
// //                   <td>
// //                     {o.userAccountCreated ? (
// //                       <span className="badge bg-success">Created</span>
// //                     ) : (
// //                       <span className="badge bg-warning">Not Created</span>
// //                     )}
// //                   </td>
// //                   <td>
// //                     {o.assignedToSocietyId ? (
// //                       <span className="badge bg-info">Assigned</span>
// //                     ) : (
// //                       <span className="badge bg-success">Available</span>
// //                     )}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       {showModal && (
// //         <div
// //           className="modal show d-block"
// //           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
// //         >
// //           <div className="modal-dialog">
// //             <div className="modal-content">
// //               <div className="modal-header">
// //                 <h5 className="modal-title">Add New Officer</h5>
// //                 <button
// //                   type="button"
// //                   className="btn-close"
// //                   onClick={() => setShowModal(false)}
// //                 ></button>
// //               </div>
// //               <form onSubmit={handleSubmit}>
// //                 <div className="modal-body">
// //                   <div className="mb-3">
// //                     <label className="form-label">Officer Name *</label>
// //                     <input
// //                       type="text"
// //                       className="form-control"
// //                       value={formData.name}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, name: e.target.value })
// //                       }
// //                       required
// //                     />
// //                   </div>
// //                   {isProvincialAdmin && (
// //                     <div className="mb-3">
// //                       <label className="form-label">District *</label>
// //                       <select
// //                         className="form-select"
// //                         value={formData.districtId}
// //                         onChange={(e) =>
// //                           setFormData({
// //                             ...formData,
// //                             districtId: e.target.value,
// //                           })
// //                         }
// //                         required
// //                       >
// //                         <option value="">Select District</option>
// //                         {districts.map((d) => (
// //                           <option key={d.id} value={d.id}>
// //                             {d.name}
// //                           </option>
// //                         ))}
// //                       </select>
// //                     </div>
// //                   )}
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button
// //                     type="button"
// //                     className="btn btn-secondary"
// //                     onClick={() => setShowModal(false)}
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button type="submit" className="btn btn-primary">
// //                     Create Officer
// //                   </button>
// //                 </div>
// //               </form>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // ==================== Manage Societies Page ====================
// const ManageSocietiesPage = ({ user }) => {
//   const [societies, setSocieties] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district || "",
//     registrationNo: "",
//     registeredAddress: "",
//   });
//   const [loading, setLoading] = useState(true);

//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const districtsData = await api.getDistricts();
//       setDistricts(districtsData);

//       if (isProvincialAdmin) {
//         // Load all societies
//         const allSocieties = await api.getSocieties();
//         setSocieties(allSocieties);
//       } else if (user.district) {
//         // Load district societies
//         const societiesData = await api.getSocietiesByDistrict(user.district);
//         setSocieties(societiesData);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createSociety(formData);
//       alert("Society created successfully!");
//       setShowModal(false);
//       setFormData({
//         name: "",
//         districtId: user.district || "",
//         registrationNo: "",
//         registeredAddress: "",
//       });
//       loadData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>Manage Societies</h2>
//         <button className="btn btn-primary" onClick={() => setShowModal(true)}>
//           <Building size={18} className="me-1" />
//           Add Society
//         </button>
//       </div>

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Society Name</th>
//                 {isProvincialAdmin && <th>District</th>}
//                 <th>Registration No</th>
//                 <th>Address</th>
//               </tr>
//             </thead>
//             <tbody>
//               {societies.map((s) => (
//                 <tr key={s.id}>
//                   <td>
//                     <strong>{s.name}</strong>
//                   </td>
//                   {isProvincialAdmin && (
//                     <td>{s.districtName || s.districtId}</td>
//                   )}
//                   <td>{s.registrationNo}</td>
//                   <td>{s.registeredAddress}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Society</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Society Name *</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">District *</label>
//                     <select
//                       className="form-select"
//                       value={formData.districtId}
//                       onChange={(e) =>
//                         setFormData({ ...formData, districtId: e.target.value })
//                       }
//                       required
//                       disabled={!isProvincialAdmin}
//                     >
//                       <option value="">Select District</option>
//                       {districts.map((d) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Registration No</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.registrationNo}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registrationNo: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">Registered Address</label>
//                     <textarea
//                       className="form-control"
//                       rows="3"
//                       value={formData.registeredAddress}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           registeredAddress: e.target.value,
//                         })
//                       }
//                     ></textarea>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Society
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== Manage Officers Page ====================
// const ManageOfficersPage = ({ user }) => {
//   const [officers, setOfficers] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     districtId: user.district || "",
//   });
//   const [loading, setLoading] = useState(true);

//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");
//   const isDistrictAdmin = user?.roles?.includes("DISTRICT_ADMIN");

//   useEffect(() => {
//     loadOfficers();
//     loadDistricts();
//   }, []);

//   const loadDistricts = async () => {
//     try {
//       const data = await api.getDistricts();
//       setDistricts(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const loadOfficers = async () => {
//     try {
//       if (isProvincialAdmin) {
//         // Load officers from all districts
//         const districtsData = await api.getDistricts();
//         const allOfficers = [];
//         for (const district of districtsData) {
//           const districtOfficers = await api.getOfficersByDistrict(district.id);
//           allOfficers.push(
//             ...districtOfficers.map((o) => ({
//               ...o,
//               districtName: district.name,
//             }))
//           );
//         }
//         setOfficers(allOfficers);
//       } else {
//         const data = await api.getOfficersByDistrict(user.district);
//         setOfficers(data);
//       }
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await api.createOfficer(formData);
//       alert("Officer created successfully!");
//       setShowModal(false);
//       setFormData({ name: "", districtId: user.district || "" });
//       loadOfficers();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2>
//           {isProvincialAdmin
//             ? "View Arbitration Officers"
//             : "Manage Arbitration Officers"}
//         </h2>
//         {/* Only District Admin can add officers */}
//         {isDistrictAdmin && (
//           <button
//             className="btn btn-primary"
//             onClick={() => setShowModal(true)}
//           >
//             <Users size={18} className="me-1" />
//             Add Officer
//           </button>
//         )}
//       </div>

//       {isProvincialAdmin && (
//         <div className="alert alert-info mb-4">
//           <AlertCircle size={18} className="me-2" />
//           Viewing all arbitration officers across all districts. Only District
//           Administrators can add new officers.
//         </div>
//       )}

//       <div className="card border-0 shadow-sm">
//         <div className="table-responsive">
//           <table className="table table-hover mb-0">
//             <thead className="table-light">
//               <tr>
//                 <th>Officer Name</th>
//                 {isProvincialAdmin && <th>District</th>}
//                 <th>User Account</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {officers.map((o) => (
//                 <tr key={o.id}>
//                   <td>
//                     <strong>{o.name}</strong>
//                   </td>
//                   {isProvincialAdmin && (
//                     <td>{o.districtName || o.districtId}</td>
//                   )}
//                   <td>
//                     {o.userAccountCreated ? (
//                       <span className="badge bg-success">Created</span>
//                     ) : (
//                       <span className="badge bg-warning">Not Created</span>
//                     )}
//                   </td>
//                   <td>
//                     {o.assignedToSocietyId ? (
//                       <span className="badge bg-info">Assigned</span>
//                     ) : (
//                       <span className="badge bg-success">Available</span>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {showModal && isDistrictAdmin && (
//         <div
//           className="modal show d-block"
//           style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">Add New Officer</h5>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   onClick={() => setShowModal(false)}
//                 ></button>
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <div className="modal-body">
//                   <div className="mb-3">
//                     <label className="form-label">Officer Name *</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={formData.name}
//                       onChange={(e) =>
//                         setFormData({ ...formData, name: e.target.value })
//                       }
//                       required
//                     />
//                   </div>
//                   <div className="mb-3">
//                     <label className="form-label">District *</label>
//                     <select
//                       className="form-select"
//                       value={formData.districtId}
//                       onChange={(e) =>
//                         setFormData({ ...formData, districtId: e.target.value })
//                       }
//                       required
//                       disabled={true}
//                     >
//                       <option value="">Select District</option>
//                       {districts.map((d) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                     <small className="text-muted">
//                       District is automatically set to your assigned district
//                     </small>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => setShowModal(false)}
//                   >
//                     Cancel
//                   </button>
//                   <button type="submit" className="btn btn-primary">
//                     Create Officer
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==================== District Submissions Page ====================
// const DistrictSubmissionsPage = ({ user }) => {
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [expandedBorrower, setExpandedBorrower] = useState(null);
//   const [districts, setDistricts] = useState([]);
//   const [allDistrictSubmissions, setAllDistrictSubmissions] = useState([]);

//   const isProvincialAdmin = user?.roles?.includes("PROVINCIAL_ADMIN");

//   useEffect(() => {
//     if (isProvincialAdmin) {
//       loadAllDistricts();
//     } else {
//       loadSubmissions();
//     }
//   }, []);

//   const loadAllDistricts = async () => {
//     try {
//       const districtsData = await api.getDistricts();
//       setDistricts(districtsData);

//       // Load submissions for all districts
//       const allSubmissions = await Promise.all(
//         districtsData.map(async (district) => {
//           const data = await api.getApprovedSubmissionsByDistrict(district.id);
//           return {
//             districtId: district.id,
//             districtName: district.name,
//             submissions: data,
//           };
//         })
//       );
//       setAllDistrictSubmissions(allSubmissions);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadSubmissions = async () => {
//     try {
//       const data = await api.getApprovedSubmissionsByDistrict(user.district);
//       setSubmissions(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMarkFeePaid = async (submissionId, borrowerId) => {
//     if (
//       !window.confirm(
//         "මෙම බේරුම් ගාස්තුව ගෙවා ඇත ලෙස සලකුණු කරන්නද? මෙය බේරුම් අංකයක් සහ නිලධාරියෙකු පවරනු ඇත."
//       )
//     )
//       return;

//     try {
//       await api.updateArbitrationFee(submissionId, borrowerId, true);
//       alert(
//         "බේරුම් ගාස්තුව ගෙවා ඇත ලෙස සලකුණු කර ඇත. බේරුම් අංකය සහ නිලධාරියා පවරා ඇත!"
//       );
//       if (isProvincialAdmin) {
//         loadAllDistricts();
//       } else {
//         loadSubmissions();
//       }
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   //   const generateLetter = (borrower, submission) => {
//   //     const currentDate = new Date().toLocaleDateString("si-LK");
//   //     const totalAmount =
//   //       parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

//   //     const letterHTML = `
//   // <!DOCTYPE html>
//   // <html>
//   // <head>
//   //     <meta charset="utf-8">
//   //     <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
//   //     <style>
//   //         @page { size: A4; margin: 2cm; }
//   //         body {
//   //             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
//   //             font-size: 11pt;
//   //             line-height: 1.5;
//   //             color: #000;
//   //         }
//   //         .page-border {
//   //             border: 2px solid #000;
//   //             padding: 25px;
//   //             min-height: 27cm;
//   //         }
//   //         .header-logo {
//   //             text-align: right;
//   //             font-size: 9pt;
//   //             font-style: italic;
//   //             color: #666;
//   //             margin-bottom: 15px;
//   //         }
//   //         .header-title {
//   //             text-align: center;
//   //             font-size: 12pt;
//   //             font-weight: bold;
//   //             margin-bottom: 20px;
//   //         }
//   //         .ref-text {
//   //             font-size: 10pt;
//   //             text-align: justify;
//   //             margin-bottom: 10px;
//   //             line-height: 1.4;
//   //         }
//   //         .filled-data {
//   //             font-weight: bold;
//   //         }
//   //     </style>
//   // </head>
//   // <body>
//   //     <div class="page-border">
//   //         <div class="header-logo">
//   //             තීරක අංකය: <span class="filled-data">${
//   //               borrower.arbitrationNumber || "..."
//   //             }</span>
//   //         </div>

//   //         <div class="header-title">
//   //             ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
//   //         </div>

//   //         <div class="ref-text">
//   //             1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
//   //             දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
//   //             වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව
//   //         </div>

//   //         <div class="ref-text">
//   //             ණයකරුවෝ <span class="filled-data">${
//   //               borrower.borrowerName
//   //             }</span> සහ ඇපකරුවෝ නම්
//   //             <span class="filled-data">${
//   //               borrower.guarantor1Name
//   //             }</span> සහ <span class="filled-data">${
//   //       borrower.guarantor2Name
//   //     }</span> ගෙන් සහ ඇපකාර,
//   //             අතර ණය මුදල වශයෙන්
//   //         </div>

//   //         <div style="margin-top: 20px;">
//   //             රු. <span class="filled-data">${parseFloat(
//   //               borrower.loanAmount
//   //             ).toLocaleString("si-LK")}</span>
//   //         </div>

//   //         <div class="ref-text" style="margin-top: 15px;">
//   //             සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
//   //               borrower.loanNumber
//   //             }</span> වන තුරු අවුරුදු ගණන මුළු මුදල
//   //             <span class="filled-data">${totalAmount.toLocaleString(
//   //               "si-LK"
//   //             )}</span> තේපල ප්‍රතිශතයක් <span class="filled-data">${
//   //       borrower.interestRate
//   //     }%</span>
//   //         </div>

//   //         <div style="margin-top: 40px;">
//   //             <div>බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
//   //               borrower.assignedOfficerName
//   //             }</span>
//   //             මහතා / මිය මෙයින් පත් කරමි.</div>
//   //         </div>

//   //         <div style="margin-top: 40px;">
//   //             <div>දිනය: <span class="filled-data">${currentDate}</span></div>
//   //         </div>

//   //         <div style="margin-top: 60px;">
//   //             <div>...........................................................</div>
//   //             <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් / නියෝජ්‍ය කොමසාරිස්</div>
//   //         </div>
//   //     </div>
//   // </body>
//   // </html>
//   //     `;

//   //     const blob = new Blob(["\ufeff", letterHTML], {
//   //       type: "application/msword",
//   //     });

//   //     const url = URL.createObjectURL(blob);
//   //     const link = document.createElement("a");
//   //     link.href = url;
//   //     link.download = `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
//   //     document.body.appendChild(link);
//   //     link.click();
//   //     document.body.removeChild(link);
//   //     URL.revokeObjectURL(url);

//   //     alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
//   //   };

//   const generateLetter = (borrower, submission) => {
//     const currentDate = new Date().toLocaleDateString("si-LK");
//     const totalAmount =
//       parseFloat(borrower.loanAmount) + parseFloat(borrower.interest);

//     const letterHTML = `
// <!DOCTYPE html>
// <html>
// <head>
//     <meta charset="utf-8">
//     <title>ආරවුලක් සිරවත් කිරීමට භාර කිරීම</title>
//     <style>
//         @page {
//             size: A4;
//             margin: 2cm;
//         }
//         body {
//             font-family: 'FM Abhaya', 'Noto Sans Sinhala', 'Iskoola Pota', Arial, sans-serif;
//             font-size: 11pt;
//             line-height: 1.5;
//             color: #000;
//         }
//         .page-border {
//             border: 2px solid #000;
//             padding: 25px;
//             min-height: 27cm;
//         }
//         .header-logo {
//             text-align: right;
//             font-size: 9pt;
//             font-style: italic;
//             color: #666;
//             margin-bottom: 15px;
//         }
//         .header-title {
//             text-align: center;
//             font-size: 12pt;
//             font-weight: bold;
//             margin-bottom: 20px;
//         }
//         .ref-text {
//             font-size: 10pt;
//             text-align: justify;
//             margin-bottom: 10px;
//             line-height: 1.4;
//         }
//         .main-section {
//             margin-top: 20px;
//         }
//         .to-section {
//             margin: 20px 0;
//         }
//         .content-para {
//             text-align: justify;
//             margin-bottom: 12px;
//             line-height: 1.6;
//         }
//         .details-section {
//             margin: 20px 0 20px 40px;
//             line-height: 2;
//         }
//         .signature-section {
//             margin-top: 60px;
//         }
//         .footer-note {
//             margin-top: 30px;
//             font-size: 9pt;
//             font-style: italic;
//             line-height: 1.4;
//         }
//         .filled-data {
//             font-weight: bold;
//         }
//     </style>
// </head>
// <body>
//     <div class="page-border">
//         <div class="header-logo">
//             තීරක අංකය: <span class="filled-data">${
//               borrower.arbitrationNumber || "..........................."
//             }</span>
//         </div>

//         <div class="header-title">
//             ආරවුලක් නිරවුල් කිරීමට භාර කිරීම ( ණය මුදල් )
//         </div>

//         <div class="ref-text">
//             1953 අංක 04 දරණ සමුපකාර සමිති (සංශෝධන) පනතෙහි සංශෝධිත ආධ්‍යාය පළාත් සභාවේ 1000 අංක 10
//             දරණ සමුපකාර සමිති ආඥා පනතේ 58 වන වගන්තිය සහ ඊ වෙනි ප්‍රඥප්තියේ 51 වගන්ති හා 83 110 (ඇ) වගන්ති
//             වගන්ති යටතේ රෙජිස්ට්‍රාර්වරයා වෙත පැවරී ඇති බලයන්ත අනුව
//         </div>

//         <div class="ref-text">
//             දරණ ගැසට් පත්‍රයේ සඳහන් කරන ලද නිවේදනයෙන් මා වෙත පවරන ලද බලය අනුව ණයකරුවෝ <span class="filled-data">${
//               borrower.borrowerName
//             }</span> සහ ඇපකරුවෝ නම්
//             <span class="filled-data">${
//               borrower.guarantor1Name
//             }</span> සහ <span class="filled-data">${
//       borrower.guarantor2Name
//     }</span> අතර ණය මුදල වශයෙන්
//         </div>

//         <div class="main-section">
//             <div class="to-section">
//                 රු. <span class="filled-data">${parseFloat(
//                   borrower.loanAmount
//                 ).toLocaleString("si-LK")}</span>
//             </div>

//             <div class="content-para">
//                 සහ වාර්ෂික පොළියක්, අංක <span class="filled-data">${
//                   borrower.loanNumber
//                 }</span> වන තුරු මුළු මුදල
//                 <span class="filled-data">රු. ${totalAmount.toLocaleString(
//                   "si-LK"
//                 )}</span> පොලී ප්‍රතිශතයක් <span class="filled-data">${
//       borrower.interestRate
//     }%</span>

//                 සම්බන්ධයෙන් පවතින තීරණය කිරීමට තීරණ තාවක්කාරු
//                 දීම සඳහා ආරවුල් බේරුම්කරු තීරණ තාවක්කාරුවක් වශයෙන් <span class="filled-data">${
//                   borrower.assignedOfficerName
//                 }</span>
//                 මහතා / මිය මෙයින් පත් කරමි.
//             </div>

//             <div style="margin-top: 30px;">
//                 <div>දිනය: <span class="filled-data">${currentDate}</span></div>
//             </div>

//             <div class="signature-section">
//                 <div>...........................................................</div>
//                 <div>සමුපකාර සංවර්ධන සහකාර කොමසාරිස් /</div>
//                 <div>නියෝජ්‍ය කොමසාරිස්</div>
//             </div>

//             <div class="footer-note">
//                 * ආරවුලේ එක් පාර්ශවයක් ඇපකරුවෙකු නොවන අවස්ථාවේදී ඒ වගන්තිය තහවුරු කර එහි සම්පූර්ණ නම් සඳහන් කරන්න.
//             </div>

//             <div class="footer-note">
//                 එහි පැවතුන්ගේ හෝ විත්තිකරුවන්ගේ තත්වය දැක්වන, එනම් ලියාපදිංචි කරන ලද සමිතියක හෝ හිටපු
//                 සාමාජිකයෙකු හෝ හිටපු / මියගිය සාමාජිකයෙකු විත්තිකරුවෙකු හෝ හිටපු කාරක සභාව අධිකාරියෙකු /
//                 සේවකයෙකු හෝ මියගිය අධිකාරියෙකු / සේවකයෙකු නීත්‍යානුකූල නියෝජිතයෙකු / උරුමක්කාරයෙකු /
//                 බාල වයස්කාරයෙකුගේ භාරකාරයෙකු හෝ යනාදී යම් පාර්ශවයක් ඇපකරුවෙකු වන විට ලියාපදිංචි
//                 ඇපකරුවෙකු යනුවෙන්ද සඳහන් කළ යුතුය.
//             </div>
//         </div>
//     </div>
// </body>
// </html>
//     `;

//     const blob = new Blob(["\ufeff", letterHTML], {
//       type: "application/msword",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `ආරවුල_භාර_කිරීම_${borrower.arbitrationNumber}.doc`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);

//     alert("ලිපිය Word ලියවිල්ලක් ලෙස බාගත වේ");
//   };

//   if (loading) {
//     return (
//       <div className="text-center py-5">
//         <div className="spinner-border text-primary" />
//       </div>
//     );
//   }

//   // Provincial Admin View - All Districts
//   if (isProvincialAdmin) {
//     return (
//       <div>
//         <h2 className="mb-4">සියලුම දිස්ත්‍රික්ක වල ඉදිරිපත් කිරීම්</h2>
//         <div className="alert alert-info mb-4">
//           <CheckCircle size={18} className="me-2" />
//           මධ්‍ය පළාතේ සියලුම දිස්ත්‍රික්ක වල ඉදිරිපත් කිරීම්
//         </div>

//         {allDistrictSubmissions.map(
//           ({ districtId, districtName, submissions: districtSubs }) => (
//             <div key={districtId} className="mb-5">
//               <h3 className="text-primary mb-3">
//                 <Building size={20} className="me-2" />
//                 {districtName} දිස්ත්‍රික්කය
//               </h3>

//               {districtSubs.length === 0 ? (
//                 <div className="alert alert-warning">
//                   <AlertCircle size={18} className="me-2" />
//                   මෙම දිස්ත්‍රික්කයේ ඉදිරිපත් කිරීම් නොමැත
//                 </div>
//               ) : (
//                 districtSubs.map((submission) => (
//                   <div key={submission.id} className="card mb-4 shadow-sm">
//                     <div className="card-header bg-primary text-white">
//                       <h5 className="mb-0">
//                         <Building size={18} className="me-2" />
//                         {submission.societyName || "Society"}
//                       </h5>
//                       <small>
//                         අනුමත කළ දිනය:{" "}
//                         {new Date(
//                           submission.approvedDate || submission.submittedDate
//                         ).toLocaleDateString("si-LK")}
//                       </small>
//                     </div>
//                     <div className="card-body">
//                       <div className="table-responsive">
//                         <table className="table table-bordered table-hover mb-0">
//                           <thead className="table-light">
//                             <tr>
//                               <th>ණය අංකය</th>
//                               <th>නම</th>
//                               <th>ණය මුදල</th>
//                               <th>බේරුම් ගාස්තු</th>
//                               <th>බේරුම් අංකය</th>
//                               <th>බේරුම්කරු</th>
//                               <th>තත්වය</th>
//                               <th>ලිපිය</th>
//                               <th>විස්තර</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {submission.borrowers.map((borrower) => (
//                               <React.Fragment key={borrower.id}>
//                                 <tr>
//                                   <td>{borrower.loanNumber}</td>
//                                   <td>
//                                     <strong>{borrower.borrowerName}</strong>
//                                   </td>
//                                   <td>
//                                     රු.{" "}
//                                     {parseFloat(
//                                       borrower.loanAmount
//                                     ).toLocaleString("si-LK")}
//                                   </td>
//                                   <td className="text-center">
//                                     {borrower.arbitrationFeePaid ? (
//                                       <span className="badge bg-success">
//                                         ගෙවා ඇත
//                                       </span>
//                                     ) : (
//                                       <span className="badge bg-danger">
//                                         නොගෙවා
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="fw-bold text-primary">
//                                     {borrower.arbitrationNumber || "-"}
//                                   </td>
//                                   <td>{borrower.assignedOfficerName || "-"}</td>
//                                   <td>
//                                     {borrower.status === "pending" && (
//                                       <span className="badge bg-warning">
//                                         අනුමැතියට
//                                       </span>
//                                     )}
//                                     {borrower.status === "assigned" && (
//                                       <span className="badge bg-info">
//                                         පවරා ඇත
//                                       </span>
//                                     )}
//                                     {borrower.status === "decision-given" && (
//                                       <span className="badge bg-success">
//                                         තීරණය ලබා දී ඇත
//                                       </span>
//                                     )}
//                                   </td>
//                                   <td className="text-center">
//                                     {borrower.arbitrationNumber && (
//                                       <button
//                                         onClick={() =>
//                                           generateLetter(borrower, submission)
//                                         }
//                                         className="btn btn-primary btn-sm"
//                                       >
//                                         <FileText size={14} className="me-1" />
//                                         ලිපිය
//                                       </button>
//                                     )}
//                                   </td>
//                                   <td>
//                                     <button
//                                       onClick={() =>
//                                         setExpandedBorrower(
//                                           expandedBorrower === borrower.id
//                                             ? null
//                                             : borrower.id
//                                         )
//                                       }
//                                       className="btn btn-info btn-sm"
//                                     >
//                                       <FileText size={14} className="me-1" />
//                                       විස්තර
//                                     </button>
//                                   </td>
//                                 </tr>
//                                 {expandedBorrower === borrower.id && (
//                                   <tr>
//                                     <td colSpan="9" className="bg-light">
//                                       <div className="row g-3 p-3">
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-primary border-bottom pb-2">
//                                                 සම්පූර්ණ තොරතුරු
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>නම:</strong>{" "}
//                                                 {borrower.borrowerName}
//                                               </p>
//                                               <p className="mb-1">
//                                                 <strong>ලිපිනය:</strong>{" "}
//                                                 {borrower.borrowerAddress}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>සාමාජික අංකය:</strong>{" "}
//                                                 {borrower.membershipNo}
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         <div className="col-md-6">
//                                           <div className="card">
//                                             <div className="card-body">
//                                               <h6 className="card-title text-success border-bottom pb-2">
//                                                 ණය විස්තර
//                                               </h6>
//                                               <p className="mb-1">
//                                                 <strong>පොලිය:</strong> රු.{" "}
//                                                 {parseFloat(
//                                                   borrower.interest
//                                                 ).toLocaleString("si-LK")}
//                                               </p>
//                                               <p className="mb-0">
//                                                 <strong>පොලී අනුපාතය:</strong>{" "}
//                                                 {borrower.interestRate}%
//                                               </p>
//                                             </div>
//                                           </div>
//                                         </div>
//                                         {borrower.arbitrationDecision && (
//                                           <div className="col-12">
//                                             <div className="card border-success">
//                                               <div className="card-body">
//                                                 <h6 className="card-title text-success border-bottom pb-2">
//                                                   තීරණ විස්තර
//                                                 </h6>
//                                                 <p className="mb-1">
//                                                   <strong>තීරණ දිනය:</strong>{" "}
//                                                   {new Date(
//                                                     borrower.decisionDate
//                                                   ).toLocaleDateString("si-LK")}
//                                                 </p>
//                                                 <p className="mb-1">
//                                                   <strong>
//                                                     ලැබුණු ණය මුදල:
//                                                   </strong>{" "}
//                                                   රු.{" "}
//                                                   {parseFloat(
//                                                     borrower.finalLoanAmount
//                                                   ).toLocaleString("si-LK")}
//                                                 </p>
//                                                 <p className="mb-1">
//                                                   <strong>අඩු කළ පොලිය:</strong>{" "}
//                                                   රු.{" "}
//                                                   {parseFloat(
//                                                     borrower.interestDeducted
//                                                   ).toLocaleString("si-LK")}
//                                                 </p>
//                                                 <p className="mb-0">
//                                                   <strong>තීරණය:</strong>{" "}
//                                                   {borrower.arbitrationDecision}
//                                                 </p>
//                                               </div>
//                                             </div>
//                                           </div>
//                                         )}
//                                       </div>
//                                     </td>
//                                   </tr>
//                                 )}
//                               </React.Fragment>
//                             ))}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>
//           )
//         )}
//       </div>
//     );
//   }

//   // District Admin View
//   return (
//     <div>
//       <h2 className="mb-4">ජිල්ලා කාර්යාලයට ඉදිරිපත් කිරීම්</h2>
//       <div className="alert alert-success mb-4">
//         <CheckCircle size={18} className="me-2" />
//         මෙම ඉදිරිපත් කිරීම් සමිති විසින් අනුමත කර ඇත
//       </div>

//       {submissions.length === 0 ? (
//         <div className="alert alert-info">
//           <AlertCircle size={18} className="me-2" />
//           සමිතිවලින් තවමත් අනුමත කළ ඉදිරිපත් කිරීම් නොමැත
//         </div>
//       ) : (
//         submissions.map((submission) => (
//           <div key={submission.id} className="card mb-4 shadow-sm">
//             <div className="card-header bg-primary text-white">
//               <h5 className="mb-0">
//                 <Building size={18} className="me-2" />
//                 {submission.societyName || "Society"}
//               </h5>
//               <small>
//                 අනුමත කළ දිනය:{" "}
//                 {new Date(
//                   submission.approvedDate || submission.submittedDate
//                 ).toLocaleDateString("si-LK")}
//               </small>
//             </div>
//             <div className="card-body">
//               <div className="table-responsive">
//                 <table className="table table-bordered table-hover mb-0">
//                   <thead className="table-light">
//                     <tr>
//                       <th>ණය අංකය</th>
//                       <th>නම</th>
//                       <th>ණය මුදල</th>
//                       <th>පොලිය</th>
//                       <th>බේරුම් ගාස්තු</th>
//                       <th>බේරුම් අංකය</th>
//                       <th>බේරුම්කරු</th>
//                       <th>ලිපිය</th>
//                       <th>විස්තර</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {submission.borrowers.map((borrower) => (
//                       <React.Fragment key={borrower.id}>
//                         <tr>
//                           <td>{borrower.loanNumber}</td>
//                           <td>
//                             <strong>{borrower.borrowerName}</strong>
//                           </td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(borrower.loanAmount).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td>
//                             රු.{" "}
//                             {parseFloat(borrower.interest).toLocaleString(
//                               "si-LK"
//                             )}
//                           </td>
//                           <td className="text-center">
//                             {borrower.arbitrationFeePaid ? (
//                               <span className="badge bg-success">ගෙවා ඇත</span>
//                             ) : (
//                               <div className="btn-group btn-group-sm">
//                                 <button
//                                   onClick={() =>
//                                     handleMarkFeePaid(
//                                       submission.id,
//                                       borrower.id
//                                     )
//                                   }
//                                   className="btn btn-success"
//                                 >
//                                   ගෙවා ඇත
//                                 </button>
//                               </div>
//                             )}
//                           </td>
//                           <td className="fw-bold text-primary">
//                             {borrower.arbitrationNumber || "-"}
//                           </td>
//                           <td>{borrower.assignedOfficerName || "-"}</td>
//                           <td className="text-center">
//                             {borrower.arbitrationNumber && (
//                               <button
//                                 onClick={() =>
//                                   generateLetter(borrower, submission)
//                                 }
//                                 className="btn btn-primary btn-sm"
//                               >
//                                 <FileText size={14} className="me-1" />
//                                 ලිපිය
//                               </button>
//                             )}
//                           </td>
//                           <td>
//                             <button
//                               onClick={() =>
//                                 setExpandedBorrower(
//                                   expandedBorrower === borrower.id
//                                     ? null
//                                     : borrower.id
//                                 )
//                               }
//                               className="btn btn-info btn-sm"
//                             >
//                               <FileText size={14} className="me-1" />
//                               විස්තර
//                             </button>
//                           </td>
//                         </tr>
//                         {expandedBorrower === borrower.id && (
//                           <tr>
//                             <td colSpan="9" className="bg-light">
//                               <div className="row g-3 p-3">
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-primary border-bottom pb-2">
//                                         සම්පූර්ණ තොරතුරු
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>නම:</strong>{" "}
//                                         {borrower.borrowerName}
//                                       </p>
//                                       <p className="mb-1">
//                                         <strong>ලිපිනය:</strong>{" "}
//                                         {borrower.borrowerAddress}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>සාමාජික අංකය:</strong>{" "}
//                                         {borrower.membershipNo}
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="col-md-6">
//                                   <div className="card">
//                                     <div className="card-body">
//                                       <h6 className="card-title text-success border-bottom pb-2">
//                                         ණය විස්තර
//                                       </h6>
//                                       <p className="mb-1">
//                                         <strong>පොලිය:</strong> රු.{" "}
//                                         {parseFloat(
//                                           borrower.interest
//                                         ).toLocaleString("si-LK")}
//                                       </p>
//                                       <p className="mb-0">
//                                         <strong>පොලී අනුපාතය:</strong>{" "}
//                                         {borrower.interestRate}%
//                                       </p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 {borrower.arbitrationDecision && (
//                                   <div className="col-12">
//                                     <div className="card border-success">
//                                       <div className="card-body">
//                                         <h6 className="card-title text-success border-bottom pb-2">
//                                           තීරණ විස්තර
//                                         </h6>
//                                         <p className="mb-1">
//                                           <strong>තීරණ දිනය:</strong>{" "}
//                                           {new Date(
//                                             borrower.decisionDate
//                                           ).toLocaleDateString("si-LK")}
//                                         </p>
//                                         <p className="mb-1">
//                                           <strong>ලැබුණු ණය මුදල:</strong> රු.{" "}
//                                           {parseFloat(
//                                             borrower.finalLoanAmount
//                                           ).toLocaleString("si-LK")}
//                                         </p>
//                                         <p className="mb-1">
//                                           <strong>අඩු කළ පොලිය:</strong> රු.{" "}
//                                           {parseFloat(
//                                             borrower.interestDeducted
//                                           ).toLocaleString("si-LK")}
//                                         </p>
//                                         <p className="mb-0">
//                                           <strong>තීරණය:</strong>{" "}
//                                           {borrower.arbitrationDecision}
//                                         </p>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 )}
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// // ==================== Main App Component ====================
// const App = () => {
//   const { user, loading } = useAuth();
//   const [showSignup, setShowSignup] = useState(false);

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//         />
//       </div>
//     );
//   }

//   if (!user) {
//     return showSignup ? (
//       <SignupPage onBackToLogin={() => setShowSignup(false)} />
//     ) : (
//       <LoginPage onShowSignup={() => setShowSignup(true)} />
//     );
//   }

//   return <Dashboard />;
// };

// // ==================== Root Component ====================
// const Root = () => (
//   <AuthProvider>
//     <link
//       href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//       rel="stylesheet"
//     />
//     <App />
//   </AuthProvider>
// );

// export default Root;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";
// import LoginPage from "./pages/Login";
// import SignupPage from "./pages/SignupPage";
// import DashboardLayout from "./layouts/DashboardLayout";
// import HomePage from "./pages/HomePage";
// import CreateSubmissionPage from "./pages/CreateSubmissionPage";
// import MySubmissionsPage from "./pages/MySubmissionsPage";
// import PendingApprovalsPage from "./pages/PendingApprovalsPage";
// import ApprovedSubmissionsPage from "./pages/ApprovedSubmissionsPage";
// import OfficerBorrowersPage from "./pages/OfficerBorrowersPage";
// import DistrictSubmissionsPage from "./pages/DistrictSubmissionsPage";
// import ProvincialOverviewPage from "./pages/ProvincialOverviewPage";
// import ManageSocietiesPage from "./pages/ManageSocietiesPage";
// import ManageOfficersPage from "./pages/ManageOfficersPage";

// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//         />
//       </div>
//     );
//   }

//   return user ? children : <Navigate to="/login" />;
// };

// const PublicRoute = ({ children }) => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-vh-100 d-flex align-items-center justify-content-center">
//         <div
//           className="spinner-border text-primary"
//           style={{ width: "3rem", height: "3rem" }}
//         />
//       </div>
//     );
//   }

//   return !user ? children : <Navigate to="/" />;
// };

// function AppRoutes() {
//   return (
//     <Router>
//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <LoginPage />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <SignupPage />
//             </PublicRoute>
//           }
//         />

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<HomePage />} />
//           <Route path="create-submission" element={<CreateSubmissionPage />} />
//           <Route path="my-submissions" element={<MySubmissionsPage />} />
//           <Route path="pending-approvals" element={<PendingApprovalsPage />} />
//           <Route
//             path="approved-submissions"
//             element={<ApprovedSubmissionsPage />}
//           />
//           <Route path="my-borrowers" element={<OfficerBorrowersPage />} />
//           <Route
//             path="district-submissions"
//             element={<DistrictSubmissionsPage />}
//           />
//           <Route
//             path="provincial-overview"
//             element={<ProvincialOverviewPage />}
//           />
//           <Route path="manage-societies" element={<ManageSocietiesPage />} />
//           <Route path="manage-officers" element={<ManageOfficersPage />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default function App() {
//   return (
//     <AuthProvider>
//       <link
//         href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
//         rel="stylesheet"
//       />
//       <AppRoutes />
//     </AuthProvider>
//   );
// }

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";
import CreateSubmissionPage from "./pages/CreateSubmissionPage";
import MySubmissionsPage from "./pages/MySubmissionsPage";
import PendingApprovalsPage from "./pages/PendingApprovalsPage";
import ApprovedSubmissionsPage from "./pages/ApprovedSubmissionsPage";
import OfficerBorrowersPage from "./pages/OfficerBorrowersPage";
import DistrictSubmissionsPage from "./pages/DistrictSubmissionsPage";

// import ProvincialOverviewPage from "./pages/ProvincialOverviewPage";
import ManageSocietiesPage from "./pages/ManageSocietiesPage";
import ManageOfficersPage from "./pages/ManageOfficersPage";
import ManageUsersPage from "./pages/ManageUsersPage"; // NEW
import ManageLegalOfficersPage from "./pages/ManageLegalOfficersPage"; // NEW
import ManageCourtsPage from "./pages/ManageCourtsPage";
import LegalOfficerCasesPage from "./pages/LegalOfficerCasesPage";
import UnpaidCasesPage from "./pages/UnpaidCasesPage";
import ProvincialUnpaidCasesPage from "./pages/ProvincialUnpaidCasesPage";

import DistrictUnpaidCasesPage from "./pages/DistrictUnpaidCasesPage";
import UnpaidCasesApprovalPage from "./pages/UnpaidCasesApprovalPage";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
        />
      </div>
    );
  }

  return !user ? children : <Navigate to="/" />;
};

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="create-submission" element={<CreateSubmissionPage />} />
          <Route path="my-submissions" element={<MySubmissionsPage />} />
          <Route path="pending-approvals" element={<PendingApprovalsPage />} />
          <Route
            path="approved-submissions"
            element={<ApprovedSubmissionsPage />}
          />
          <Route path="my-borrowers" element={<OfficerBorrowersPage />} />
          <Route path="my-legal-cases" element={<LegalOfficerCasesPage />} />
          <Route path="unpaid-borrowers" element={<UnpaidCasesPage />} />
          <Route
            path="unpaid-borrowers-approval"
            element={<UnpaidCasesApprovalPage />}
          />
          <Route
            path="district-pending-payments"
            element={<DistrictUnpaidCasesPage />}
          />
          <Route
            path="provincial-pending-payments"
            element={<ProvincialUnpaidCasesPage />}
          />
          <Route
            path="district-submissions"
            element={<DistrictSubmissionsPage />}
          />
          {/* <Route
            path="provincial-overview"
            element={<ProvincialOverviewPage />}
          /> */}
          <Route path="manage-societies" element={<ManageSocietiesPage />} />
          <Route path="manage-officers" element={<ManageOfficersPage />} />
          <Route
            path="manage-legalofficers"
            element={<ManageLegalOfficersPage />}
          />
          <Route path="manage-courts" element={<ManageCourtsPage />} />
          {/* NEW: User Management Route */}
          <Route path="manage-users" element={<ManageUsersPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <AppRoutes />
    </AuthProvider>
  );
}
