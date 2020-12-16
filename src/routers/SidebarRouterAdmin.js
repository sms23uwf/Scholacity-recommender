import React from 'react';
import CreateSvgIcon from "@material-ui/icons/utils/createSvgIcon";
import { Home, DateRangeSharp, AssignmentSharp, Info, Work, EditSharp, ShoppingCart, LocalLibrarySharp, ExitToApp } from '@material-ui/icons';
import DashboardPage from '../components/DashboardPage';
import AdminDashboard from '../components/AdminDashboard';
import AdminAboutPage from '../components/AdminAboutPage';
import AdminOfferingsDashboard from '../components/AdminOfferingsDashboard';
import AdminLearningObjectiveDashboard from '../components/AdminLearningObjectiveDashboard';
import MaintenanceDashboard from '../components/MaintenanceDashboard';
import AdminDOWDashboard from '../components/AdminDOWDashboard';
import LogoutPage from '../components/LogoutPage';
import UserManualAdmin from '../components/UserManualAdmin';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';

const PsychologyOutline = CreateSvgIcon(
  <g>
  <path d="M15.82,7.22l-1,0.4c-0.21-0.16-0.43-0.29-0.67-0.39L14,6.17C13.98,6.07,13.9,6,13.8,6h-1.6c-0.1,0-0.18,0.07-0.19,0.17 l-0.15,1.06c-0.24,0.1-0.47,0.23-0.67,0.39l-1-0.4c-0.09-0.03-0.2,0-0.24,0.09l-0.8,1.38c-0.05,0.09-0.03,0.2,0.05,0.26l0.85,0.66 C10.02,9.73,10,9.87,10,10c0,0.13,0.01,0.26,0.03,0.39l-0.84,0.66c-0.08,0.06-0.1,0.17-0.05,0.25l0.8,1.39 c0.05,0.09,0.15,0.12,0.25,0.09l0.99-0.4c0.21,0.16,0.43,0.29,0.68,0.39L12,13.83c0.02,0.1,0.1,0.17,0.2,0.17h1.6 c0.1,0,0.18-0.07,0.2-0.17l0.15-1.06c0.24-0.1,0.47-0.23,0.67-0.39l0.99,0.4c0.09,0.04,0.2,0,0.24-0.09l0.8-1.39 c0.05-0.09,0.03-0.19-0.05-0.25l-0.83-0.66C15.99,10.26,16,10.13,16,10c0-0.14-0.01-0.27-0.03-0.39l0.85-0.66 c0.08-0.06,0.1-0.17,0.05-0.26l-0.8-1.38C16.02,7.22,15.91,7.19,15.82,7.22z M13,11.43c-0.79,0-1.43-0.64-1.43-1.43 S12.21,8.57,13,8.57s1.43,0.64,1.43,1.43S13.79,11.43,13,11.43z"/>,
  <path d="M19.94,9.06c-0.43-3.27-3.23-5.86-6.53-6.05C13.27,3,13.14,3,13,3C9.47,3,6.57,5.61,6.08,9l-1.93,3.48 C3.74,13.14,4.22,14,5,14h1v2c0,1.1,0.9,2,2,2h1v3h7v-4.68C18.62,15.07,20.35,12.24,19.94,9.06z M14.89,14.63L14,15.05V19h-3v-3H8 v-4H6.7l1.33-2.33C8.21,7.06,10.35,5,13,5c2.76,0,5,2.24,5,5C18,12.09,16.71,13.88,14.89,14.63z"/>
  "PsychologyOutline",
  </g>
);

const LightBulbInHead = CreateSvgIcon(
<svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <g>
   <path d="M422.286,195.543c-3.906-3.904-10.238-3.904-14.143,0c-3.905,3.906-3.905,10.238,0,14.143
     c0.154,0.154,0.314,0.311,0.469,0.455c1.93,1.807,4.385,2.701,6.835,2.701c2.668,0,5.332-1.063,7.3-3.164
     C426.523,205.649,426.316,199.319,422.286,195.543z"/>
   <path d="M401.969,179.119c-5.724-3.887-11.601-7.354-17.467-10.307c-33.186-16.699-68.353-20.051-101.701-9.695
     c-5.274,1.639-8.223,7.242-6.584,12.516c1.638,5.275,7.239,8.221,12.516,6.584c28.304-8.791,58.311-5.865,86.777,8.459
     c5.021,2.529,10.286,5.639,15.226,8.99c1.721,1.168,3.674,1.729,5.607,1.729c3.202,0,6.349-1.535,8.283-4.385
     C407.728,188.441,406.538,182.221,401.969,179.119z"/>
   <path d="M492.946,308.529c-4.1-8.6-10.889-22.842-11.011-27.553c11.694-28.824,7.428-60.721-12.05-89.898
     c-29.953-44.873-91.343-77.443-145.97-77.443c-28.876,0-57.073,6.886-82.441,20.031c-7.278-39.877-42.25-70.208-84.196-70.208
     c-47.206,0-85.61,38.404-85.61,85.609c0,30.033,15.306,57.34,40.94,73.045c7.39,4.528,9.062,8.442,9.656,14.855v34.143v24.373
     c0,11.166,9.082,20.25,20.245,20.25h3.4c5.493,43.776,26.679,83.521,60.309,112.768c0.317,0.988,1.242,5.619-2.732,19.436
     c-3.095,10.764-7.845,22.721-12.034,33.271c-2.804,7.059-5.226,13.156-6.69,17.766c-0.965,3.039-0.423,6.357,1.46,8.932
     c1.884,2.574,4.882,4.096,8.071,4.096h142.745c4.69,0,11.132-2.1,15.187-12.105c1.765-4.354,2.917-9.592,4.138-15.139
     c1.188-5.404,3.974-18.061,6.744-19.59c0.002,0,0.164-0.027,0.555,0.033c0.513,0.082,1.032,0.121,1.552,0.121
     c14.949,0,27.164,0.678,37.941,1.275c31.609,1.754,50.689,2.813,67.426-21.295c8.512-12.262,7.547-30.145,6.526-49.078
     c-0.526-9.758-1.069-19.83-0.105-28.203c1.745-1.719,6.115-4.719,8.855-6.6c9.427-6.475,18.33-12.588,18.33-21.883
     C504.19,332.473,499.917,323.152,492.946,308.529z M123.058,205.056c-19.655-12.04-31.389-32.97-31.389-55.99
     c0-36.178,29.433-65.609,65.61-65.609c36.178,0,65.61,29.432,65.61,65.609c0,23.02-11.733,43.951-31.389,55.992
     c-9.341,5.725-14.893,12.402-17.528,21.424l-16.696-0.006l-16.688,0.006C137.951,217.461,132.4,210.783,123.058,205.056z
      M172.294,246.484v14.625h-30.028v-14.625H172.294z M142.511,295.732c-0.111,0-0.245-0.138-0.245-0.25v-14.373h30.028v14.373
     c0,0.113-0.135,0.25-0.248,0.25H142.511z M474.538,344.932c-8.607,5.912-16.041,11.016-17.137,18.74
     c-1.506,10.596-0.874,22.305-0.264,33.627c0.758,14.047,1.616,29.969-2.984,36.596c-9.95,14.334-18.556,14.473-49.889,12.732
     c-10.338-0.574-23.166-1.285-38.375-1.307c-5.841-0.688-15.724,0.408-22.319,13.229c-3.35,6.51-5.15,14.691-6.738,21.908
     c-0.798,3.627-1.919,8.723-2.969,11.543H208.689c0.438-1.105,0.89-2.244,1.354-3.412c14.406-36.273,23.53-62.877,9.642-74.883
     c-29.436-25.459-48.208-59.933-53.591-97.973h5.953c11.165,0,20.248-9.084,20.248-20.25v-24.373v-34.123
     c0.593-6.425,2.26-10.342,9.656-14.875c23.671-14.502,38.523-38.899,40.661-66.198c24.544-14.585,52.54-22.279,81.304-22.279
     c47.648,0,103.251,29.469,129.336,68.547c11.18,16.748,21.979,42.803,9.931,71.813c-3.924,9.447,1.894,22.549,11.71,43.141
     c3.178,6.666,7.778,16.316,8.996,20.824C481.823,339.93,477.381,342.98,474.538,344.932z"/>
   <path d="M206.331,134.937c-2.953-10.945-10.294-19.711-21.231-25.354c-4.908-2.529-10.939-0.605-13.472,4.305
     c-2.531,4.909-0.605,10.94,4.304,13.471c5.971,3.08,9.599,7.264,11.089,12.787c2.359,8.744-1.209,18.205-2.775,20.662
     c-2.969,4.658-1.6,10.84,3.057,13.809c1.666,1.063,3.527,1.568,5.366,1.568c3.303,0,6.535-1.633,8.441-4.625
     C205.376,164.871,210.286,149.595,206.331,134.937z"/>
   <path d="M157.279,0c-5.523,0-10,4.479-10,10v28.508c0,5.521,4.477,10,10,10c5.522,0,10-4.479,10-10V10
     C167.279,4.479,162.801,0,157.279,0z"/>
   <path d="M46.323,139.465H17.815c-5.523,0-10,4.479-10,10c0,5.523,4.477,10,10,10h28.509c5.522,0,9.999-4.477,9.999-10
     C56.323,143.944,51.845,139.465,46.323,139.465z"/>
   <path d="M110.457,48.363l-14.25-24.678c-2.762-4.783-8.879-6.42-13.661-3.66c-4.782,2.762-6.421,8.877-3.659,13.66l14.25,24.678
     c1.853,3.209,5.213,5.002,8.669,5.002c1.697,0,3.417-0.432,4.991-1.342C111.58,59.261,113.219,53.146,110.457,48.363z"/>
   <path d="M66.178,85.325l-24.681-14.25c-4.782-2.76-10.899-1.121-13.66,3.66c-2.762,4.783-1.123,10.898,3.66,13.66l24.681,14.25
     c1.574,0.91,3.294,1.342,4.99,1.342c3.456,0,6.817-1.793,8.67-5.002C72.6,94.204,70.961,88.087,66.178,85.325z"/>
   <path d="M286.725,74.734c-2.763-4.783-8.878-6.422-13.66-3.66l-24.681,14.25c-4.783,2.762-6.422,8.879-3.66,13.66
     c1.852,3.209,5.213,5.002,8.669,5.002c1.696,0,3.416-0.432,4.991-1.342l24.681-14.25
     C287.848,85.632,289.487,79.517,286.725,74.734z"/>
   <path d="M69.843,199.947c-2.76-4.783-8.874-6.42-13.658-3.662l-24.687,14.25c-4.783,2.76-6.423,8.877-3.662,13.66
     c1.852,3.209,5.214,5.002,8.67,5.002c1.696,0,3.415-0.432,4.99-1.34l24.686-14.25C70.965,210.847,72.605,204.73,69.843,199.947z"
     />
   <path d="M104.74,240.467c-4.781-2.76-10.898-1.121-13.66,3.66L78.886,265.25c-2.761,4.783-1.122,10.9,3.661,13.66
     c1.575,0.91,3.294,1.342,4.99,1.342c3.456,0,6.818-1.793,8.67-5.002l12.194-21.123
     C111.163,249.344,109.524,243.229,104.74,240.467z"/>
   <path d="M232.015,20.025c-4.784-2.762-10.898-1.123-13.66,3.66l-14.25,24.678c-2.762,4.783-1.124,10.899,3.659,13.66
     c1.575,0.91,3.295,1.342,4.991,1.342c3.456,0,6.817-1.793,8.67-5.002l14.25-24.678C238.437,28.902,236.798,22.787,232.015,20.025z
     "/>
  </g>
</svg>
);

const LightBulbOutline = CreateSvgIcon(
  <svg id="emoji" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <g id="line">
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="m52.55 23.75c0 3.985-1.785 5.908-3.754 10.5-0.5028 1.172-4.211 13.38-4.211 13.38h-17.17s-2.981-11.67-3.546-12.62c-2.37-3.998-4.419-6.91-4.419-11.26 0-9.141 7.41-16.55 16.55-16.55 9.141 0 16.55 7.41 16.55 16.55z"/>
    <line x1="36" x2="36" y1="47.22" y2="35.28" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
    <line x1="41.97" x2="30.03" y1="35.28" y2="35.28" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
    <path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.696" d="m44.16 58.79c0 3.24-3.651 5.867-8.155 5.867-4.504 0-8.155-2.627-8.155-5.867z"/>
    <line x1="27.99" x2="44.01" y1="54.98" y2="51.51" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="1.965"/>
    <line x1="38.2" x2="43.98" y1="56.07" y2="54.89" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
    <line x1="28.02" x2="33.8" y1="51.6" y2="50.42" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
  </g>
</svg>
);

const NounLightBulb = CreateSvgIcon(
  <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enableBackground="new 0 0 100 100" xml-space="preserve">
    <g>
      <path d="M65.406,88.371h-2.391V79.26l2.957-3.643c0.16-0.197,0.248-0.445,0.248-0.699v-6.363l5.787-10.16   c2.355-3.949,3.602-8.479,3.602-13.098c0-6.84-2.664-13.271-7.5-18.107C63.271,22.353,56.842,19.688,50,19.688   c-6.841,0-13.271,2.664-18.108,7.501c-4.837,4.836-7.5,11.268-7.5,18.107c0,4.619,1.245,9.148,3.6,13.098l5.788,10.16v6.363   c0,0.254,0.088,0.502,0.249,0.699l2.956,3.643v9.111h-2.389c-0.615,0-1.113,0.498-1.113,1.111c0,0.615,0.498,1.113,1.113,1.113   h2.389v2.922c0,0.615,0.498,1.113,1.113,1.113h1.845c0.003,0.01,0.007,0.018,0.011,0.027c0.008,0.021,0.017,0.045,0.026,0.066   c0.037,0.096,0.074,0.191,0.112,0.289c0.012,0.031,0.024,0.063,0.036,0.094c0.038,0.098,0.075,0.197,0.113,0.299   c0.008,0.023,0.017,0.045,0.025,0.068c0.048,0.127,0.095,0.256,0.144,0.389c0,0,0,0.002,0.001,0.002   c0.046,0.127,0.092,0.254,0.138,0.383c0.012,0.033,0.023,0.066,0.035,0.1c0.036,0.102,0.073,0.205,0.109,0.309   c0.013,0.037,0.026,0.074,0.04,0.113c0.041,0.115,0.081,0.232,0.122,0.352c0.007,0.02,0.014,0.039,0.021,0.059   c0,0.002,0,0.002,0,0.002l0.082,0.238c0.077,0.225,0.266,0.391,0.497,0.438l0.248,0.051c0.446,0.094,0.894,0.178,1.344,0.256   c1.286,0.221,2.586,0.379,3.883,0.477c0.065,0.006,0.132,0.012,0.197,0.016c0.024,0.002,0.05,0.004,0.075,0.006   c0.807,0.055,1.625,0.088,2.432,0.094c0.006,0,0.013,0,0.019,0h0.001c0.117,0.002,0.233,0.002,0.35,0.002   c0.117,0,0.233,0,0.351-0.002c0.864-0.006,1.739-0.041,2.604-0.104c0.049-0.004,0.098-0.01,0.145-0.012   c1.742-0.133,3.492-0.379,5.201-0.732l0.248-0.051c0.23-0.047,0.42-0.215,0.496-0.438l0.082-0.24   c0.049-0.139,0.096-0.275,0.143-0.41c0.014-0.039,0.027-0.078,0.043-0.119c0.033-0.098,0.068-0.193,0.102-0.289   c0.014-0.041,0.029-0.082,0.043-0.121c0.039-0.109,0.078-0.219,0.117-0.326c0.008-0.02,0.016-0.039,0.021-0.059   c0.047-0.125,0.092-0.248,0.137-0.369c0.014-0.035,0.025-0.068,0.039-0.104c0.033-0.088,0.064-0.174,0.098-0.26   c0.016-0.041,0.031-0.08,0.045-0.119c0.033-0.086,0.066-0.172,0.1-0.256c0.012-0.031,0.025-0.064,0.037-0.096   c0.002-0.008,0.006-0.014,0.008-0.021h1.846c0.613,0,1.111-0.498,1.111-1.113v-2.922h2.391c0.613,0,1.111-0.498,1.111-1.113   C66.518,88.869,66.02,88.371,65.406,88.371z M38.986,78.076c-0.092-0.123-0.208-0.225-0.342-0.301l-2.639-3.252V68.91h9.426h9.137   h9.428v5.613l-2.639,3.252c-0.135,0.076-0.25,0.178-0.344,0.301H38.986z M53.697,56.535c-0.232-0.094-0.482-0.152-0.744-0.17   v-2.563c0-0.434-0.113-0.84-0.313-1.193l4.814-9.46l1.068,0.395L53.697,56.535z M49.497,52.689h1.008   c0.336,0,0.636,0.15,0.841,0.385c0.008,0.012,0.018,0.021,0.025,0.033c0.154,0.189,0.246,0.432,0.246,0.695v2.557h-3.234v-2.557   C48.383,53.189,48.882,52.689,49.497,52.689z M51.641,51.635c-0.34-0.178-0.726-0.279-1.136-0.279h-0.674l-1.179-9.913l7.459,1.407   L51.641,51.635z M48.511,51.563c-0.86,0.379-1.463,1.24-1.463,2.24v2.563c-0.262,0.018-0.512,0.076-0.745,0.17l-4.821-12.981   l5.831-2.06L48.511,51.563z M46.099,58.807c0-0.613,0.499-1.111,1.112-1.111h0.505h4.569h0.504c0.613,0,1.113,0.498,1.113,1.111   v8.768h-7.803V58.807z M54.797,57.41l5.197-13.995c0.006-0.011,0.01-0.021,0.016-0.033c0.004-0.011,0.006-0.022,0.01-0.033   l0.451-1.218c0.129-0.346-0.047-0.73-0.393-0.858c-0.346-0.129-0.73,0.048-0.857,0.394l-0.232,0.626l-0.922-0.341l0.268-0.529   c0.168-0.328,0.037-0.73-0.291-0.897s-0.73-0.036-0.898,0.292l-0.402,0.794l-8.256-1.558l-0.107-0.903   c-0.044-0.366-0.376-0.629-0.742-0.584c-0.366,0.043-0.627,0.375-0.584,0.741l0.099,0.828l-6.135,2.167l-0.236-0.636   c-0.128-0.346-0.513-0.522-0.858-0.394c-0.346,0.128-0.521,0.513-0.394,0.858l0.407,1.096c0.005,0.051,0.016,0.103,0.034,0.152   c0.02,0.057,0.048,0.106,0.08,0.153l5.154,13.878c-0.277,0.396-0.44,0.879-0.44,1.396v8.768h-8.981c0,0-0.001-0.002-0.002-0.002   l-5.86-10.289c-0.004-0.006-0.008-0.012-0.012-0.02c-2.153-3.607-3.292-7.745-3.292-11.967c0-12.894,10.49-23.384,23.384-23.384   s23.384,10.49,23.384,23.384c0,4.222-1.139,8.359-3.293,11.967c-0.004,0.008-0.008,0.014-0.012,0.02L64.221,67.57   c0,0.002-0.002,0.004-0.002,0.004h-8.982v-8.768C55.236,58.289,55.074,57.807,54.797,57.41z M57.234,95.852   c-1.465,0.279-2.955,0.473-4.439,0.58c-0.818,0.061-1.646,0.094-2.462,0.1c-0.222,0.002-0.442,0.002-0.664,0   c-0.792-0.006-1.596-0.037-2.388-0.094c-1.509-0.105-3.024-0.303-4.514-0.586c-0.269-0.762-0.528-1.461-0.784-2.111h16.035   C57.762,94.391,57.502,95.09,57.234,95.852z M60.791,92.406h-0.818h-0.666H40.693h-0.665h-0.82V79.412h21.582V92.406z"></path>
      <path d="M52.334,61.984c-0.742-0.301-1.527-0.455-2.333-0.455s-1.592,0.154-2.333,0.455c-0.228,0.092-0.338,0.352-0.245,0.58   c0.093,0.227,0.353,0.336,0.58,0.244c0.635-0.258,1.307-0.389,1.999-0.389s1.365,0.131,1.998,0.389   c0.057,0.021,0.113,0.033,0.168,0.033c0.176,0,0.342-0.105,0.412-0.277C52.672,62.336,52.563,62.076,52.334,61.984z"></path>
      <path d="M57.555,74.473H42.446c-0.246,0-0.445,0.199-0.445,0.445c0,0.244,0.199,0.443,0.445,0.443h15.108   c0.246,0,0.445-0.199,0.445-0.443C58,74.672,57.801,74.473,57.555,74.473z"></path>
      <path d="M50,16.351c0.491,0,0.89-0.398,0.89-0.89V2.467c0-0.491-0.398-0.89-0.89-0.89s-0.89,0.398-0.89,0.89v12.994   C49.111,15.952,49.509,16.351,50,16.351z"></path>
      <path d="M37.562,18.155c0.144,0.34,0.473,0.544,0.82,0.544c0.115,0,0.233-0.022,0.346-0.07c0.453-0.191,0.665-0.714,0.473-1.166   L34.143,5.494c-0.191-0.453-0.713-0.665-1.166-0.474c-0.453,0.191-0.665,0.714-0.473,1.166L37.562,18.155z"></path>
      <path d="M71.727,65.766c-0.348-0.348-0.91-0.348-1.258,0s-0.348,0.91,0,1.258l9.188,9.188c0.174,0.174,0.402,0.262,0.629,0.262   c0.229,0,0.457-0.088,0.631-0.262c0.348-0.348,0.348-0.91,0-1.258L71.727,65.766z"></path>
      <path d="M28.273,24.829c0.174,0.174,0.401,0.261,0.629,0.261c0.228,0,0.456-0.087,0.629-0.261c0.348-0.348,0.348-0.911,0-1.259   l-9.188-9.188c-0.348-0.347-0.911-0.347-1.258,0c-0.348,0.348-0.348,0.911,0,1.259L28.273,24.829z"></path>
      <path d="M89.801,61.152l-11.99-5.008c-0.453-0.189-0.975,0.023-1.164,0.479c-0.189,0.453,0.023,0.975,0.479,1.164l11.988,5.008   c0.113,0.047,0.229,0.068,0.344,0.068c0.348,0,0.68-0.205,0.822-0.547C90.469,61.863,90.254,61.342,89.801,61.152z"></path>
      <path d="M10.599,30l11.452,4.783c0.112,0.047,0.229,0.069,0.343,0.069c0.348,0,0.679-0.206,0.821-0.547   c0.189-0.454-0.024-0.976-0.478-1.165l-11.452-4.783c-0.454-0.189-0.975,0.024-1.165,0.479C9.931,29.289,10.146,29.811,10.599,30z"></path>
      <path d="M92.83,44.407H79.836c-0.49,0-0.889,0.398-0.889,0.89s0.398,0.89,0.889,0.89H92.83c0.492,0,0.891-0.398,0.891-0.89   S93.322,44.407,92.83,44.407z"></path>
      <path d="M21.055,45.297c0-0.491-0.398-0.89-0.89-0.89H7.17c-0.491,0-0.89,0.398-0.89,0.89s0.399,0.89,0.89,0.89h12.995   C20.656,46.187,21.055,45.788,21.055,45.297z"></path>
      <path d="M76.668,34.025c0.145,0.34,0.475,0.544,0.82,0.544c0.117,0,0.234-0.023,0.348-0.07l11.969-5.06   c0.451-0.191,0.664-0.713,0.473-1.166s-0.713-0.664-1.166-0.474l-11.969,5.06C76.689,33.051,76.477,33.572,76.668,34.025z"></path>
      <path d="M23.332,56.568c-0.191-0.453-0.713-0.664-1.166-0.473l-11.969,5.059c-0.453,0.191-0.665,0.713-0.473,1.166   c0.144,0.34,0.473,0.543,0.82,0.543c0.115,0,0.233-0.021,0.346-0.07l11.969-5.059C23.312,57.543,23.523,57.021,23.332,56.568z"></path>
      <path d="M71.098,25.09c0.229,0,0.455-0.087,0.629-0.261l9.189-9.188c0.348-0.348,0.348-0.911,0-1.259   c-0.348-0.347-0.912-0.347-1.26,0l-9.188,9.188c-0.348,0.348-0.348,0.911,0,1.259C70.643,25.003,70.869,25.09,71.098,25.09z"></path>
      <path d="M28.273,65.766l-9.188,9.188c-0.348,0.348-0.348,0.91,0,1.258c0.174,0.174,0.401,0.262,0.629,0.262   c0.228,0,0.455-0.088,0.629-0.262l9.188-9.188c0.348-0.348,0.348-0.912,0-1.258C29.185,65.418,28.621,65.418,28.273,65.766z"></path>
      <path d="M61.271,18.629c0.113,0.048,0.232,0.07,0.348,0.07c0.346,0,0.676-0.204,0.82-0.544l5.059-11.969   c0.191-0.452-0.021-0.975-0.475-1.166s-0.975,0.021-1.166,0.474l-5.059,11.968C60.607,17.915,60.82,18.438,61.271,18.629z"></path>
    </g>
  </svg>
  );
  
const PensiveFaceFill = CreateSvgIcon(
  <svg id="emoji" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g id="color">
    <circle cx="36" cy="36.2" r="24" fill="#DCDCDC"/>
    <path fill="#DCDCDC" d="M19.1,62.3c-0.3-1.2-0.4-2.4-0.3-3.6c0.2-1.1,2.3-6.5,2.7-7.3s1.4-4.5,2.4-4.8c1-0.3,1.2,0.1,1.1,0.7 S24.4,55,24.4,55l9.4-2.8c0,0,7.7-1.9,7.9-1c2.1,2-5.4,4.5-7.5,4.4c0,0,1.1,0.6,0.9,1.3s-0.8,1.2-1,1.2s0.5,0.5,0.6,1.4 c0.9,1.8-2.8,2.3-2.8,2.3c1.3-0.2,3.3,2.1,0.1,2.7c-1,0.3-4.8,1.4-4.8,1.4s-3.3,1.2-5.2-0.1C20.8,65,19.7,63.8,19.1,62.3z"/>
  </g>
  <g id="line">
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28.9,44.5c2.4-0.7,11.9,0.5,14.1,2.1"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22.4,22.5c1.3-0.9,2.8-1.3,4.4-1.1c1.6,0,3.1,0.6,4.2,1.7"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M51.1,26.5c-2.7-0.7-5.5-0.8-8.2-0.3"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M42,58.4c12.3-3.3,19.5-15.9,16.2-28.2S42.3,10.7,30,14c-10,2.7-17,11.8-17,22.2c0,4.6,1.4,9.2,4,13"/>
    <path d="M31,30.7c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S31,29,31,30.7"/>
    <path d="M48,33.7c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S48,32,48,33.7"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.7,56.7c-1,1.6-1.2,3.7-0.5,5.5c1.1,3.3,4,5.2,7.2,4.2l4.9-1.4l1-0.3c0.8-0.2,1.3-1.1,1.1-1.8l0,0 c-0.2-0.5-0.6-0.9-1.2-1l1.2-0.3c0.8-0.2,1.3-1.1,1.1-1.8c-0.2-0.5-0.6-1-1.2-1.1l1.2-0.4c0.8-0.2,1.3-1.1,1.1-1.8 c-0.1-0.5-0.5-0.9-1-1l6.4-1.9c0.8-0.2,1.3-1.1,1.1-1.8s-1.1-1.3-1.8-1.1l0,0l-10.2,3l-5.1,1.5l0.6-7.8c0.1-0.9-1.5-1.2-2.1,0.2 L19.7,56.7z"/>
  </g>
</svg>

);

const PensiveFaceOutline = CreateSvgIcon(
  <svg id="emoji" viewBox="0 0 72 72" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <g id="line">
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28.9,44.5c2.4-0.7,11.9,0.5,14.1,2.1"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22.4,22.5c1.3-0.9,2.8-1.3,4.4-1.1c1.6,0,3.1,0.6,4.2,1.7"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M51.1,26.5c-2.7-0.7-5.5-0.8-8.2-0.3"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M42,58.4c12.3-3.3,19.5-15.9,16.2-28.2S42.3,10.7,30,14c-10,2.7-17,11.8-17,22.2c0,4.6,1.4,9.2,4,13"/>
    <path d="M31,30.7c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S31,29,31,30.7"/>
    <path d="M48,33.7c0,1.7-1.3,3-3,3s-3-1.3-3-3s1.3-3,3-3S48,32,48,33.7"/>
    <path fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.7,56.7c-1,1.6-1.2,3.7-0.5,5.5c1.1,3.3,4,5.2,7.2,4.2l4.9-1.4l1-0.3c0.8-0.2,1.3-1.1,1.1-1.8l0,0 c-0.2-0.5-0.6-0.9-1.2-1l1.2-0.3c0.8-0.2,1.3-1.1,1.1-1.8c-0.2-0.5-0.6-1-1.2-1.1l1.2-0.4c0.8-0.2,1.3-1.1,1.1-1.8 c-0.1-0.5-0.5-0.9-1-1l6.4-1.9c0.8-0.2,1.3-1.1,1.1-1.8s-1.1-1.3-1.8-1.1l0,0l-10.2,3l-5.1,1.5l0.6-7.8c0.1-0.9-1.5-1.2-2.1,0.2 L19.7,56.7z"/>
  </g>
</svg>
);

const SidebarRouterAlt = [
  {
    path: '/dashboard',
    sidebarName: 'Home',
    navbarName: 'Home',
    icon: Home,
    component: DashboardPage,
    showModal: false
  },
  {
    path: '/adminDashboard',
    sidebarName: 'View Registrations',
    navbarName: 'View Registrations',
    icon: AssignmentSharp,
    component: AdminDashboard
  },
  {
    path: '/adminLearningObjectiveDashboard',
    sidebarName: 'View Learning Outcomes',
    navbarName: 'View Learning Outcomes',
    icon: PensiveFaceFill,
    component: AdminLearningObjectiveDashboard
  },
  {
    path: '/adminOfferingsDashboard',
    sidebarName: 'View Courses by Area',
    navbarName: 'View Courses by Area',
    icon: LocalLibrarySharp,
    component: AdminOfferingsDashboard
  },
  {
    path: '/adminDOWDashboard',
    sidebarName: 'View Courses by Day',
    navbarName: 'View Courses by Day',
    icon: DateRangeSharp,
    component: AdminDOWDashboard
  },
  // {
  //   path: '/maintenanceDashboard',
  //   sidebarName: 'Maintain Courses',
  //   navbarName: 'Maintain Courses',
  //   icon: EditSharp,
  //   component: MaintenanceDashboard
  // },
  {
    path:'/adminAboutPage',
    sidebarName: 'About',
    navbarName: 'About',
    icon: Info,
    component: AdminAboutPage,
    showModal:true
  },
  {
    path:'/userManualPageAdmin',
    sidebarName: 'User Manual',
    navbarName: 'User Manual',
    icon: PictureAsPdfIcon,
    component: UserManualAdmin,
    showModal:false
  },
  {
    path: '/logoutPage',
    sidebarName: 'Log Out',
    navbarName: 'Log Out',
    icon: ExitToApp,
    component: LogoutPage,
    showModal: false
  }
];

export default SidebarRouterAlt;
