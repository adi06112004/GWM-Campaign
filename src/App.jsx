import React from "react";
import CampaignForm from "./components/CampaignForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeadList from "./components/LeadList";
import CampaignForm2 from "./components/CampaignForm2";
import CampaignForm3 from "./components/CampaignForm3";
import CampaignForm4 from "./components/CampaignForm4";
import CampaignForm5 from "./components/CampaignForm5";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CampaignForm />} />
        <Route path="/campaign2" element={<CampaignForm2 />} />
        <Route path="/campaign3" element={<CampaignForm3 />} />
        <Route path="/campaign4" element={<CampaignForm4 />} />
        <Route path="/campaign5" element={<CampaignForm5 />} />
        <Route path="/lead/campaign1" element={<LeadList campaignId="campaign1"/>} />
        <Route path="/lead/campaign2" element={<LeadList campaignId="campaign2"/>} />
        <Route path="/lead/campaign3" element={<LeadList campaignId="campaign3"/>} />
        <Route path="/lead/campaign4" element={<LeadList campaignId="campaign4"/>} />
        <Route path="/lead/campaign5" element={<LeadList campaignId="campaign5"/>} />
      </Routes>
    </Router>
  );
}

export default App;
