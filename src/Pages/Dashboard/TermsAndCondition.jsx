import { Button, message, Modal } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";

const TermsAndCondition = () => {
  const editor = useRef(null);

  // Separate state for Employee and Client Terms & Conditions
  const [employeeTermsContent, setEmployeeTermsContent] = useState(`
    <p style="font-size: 16px; color: #555;">Welcome employee! These terms govern your responsibilities and usage while working with us.</p><br />
    <h3 style="font-size: 20px; font-weight: bold; color: #444;">1. Work Policy</h3>
    <p style="font-size: 16px; color: #555;">Employees must adhere to company policies and work ethics.</p><br />
    <h3 style="font-size: 20px; font-weight: bold; color: #444;">2. Confidentiality</h3>
    <p style="font-size: 16px; color: #555;">Employees are required to keep company data confidential.</p>
  `);

  const [clientTermsContent, setClientTermsContent] = useState(`
    <p style="font-size: 16px; color: #555;">Welcome client! These terms govern your relationship and interactions with our services.</p><br />
    <h3 style="font-size: 20px; font-weight: bold; color: #444;">1. Service Usage</h3>
    <p style="font-size: 16px; color: #555;">Clients must use the services responsibly and lawfully.</p><br />
    <h3 style="font-size: 20px; font-weight: bold; color: #444;">2. Payment Policy</h3>
    <p style="font-size: 16px; color: #555;">All payments must be completed according to the agreed terms.</p>
  `);

  // Active tab (Employee or Client)
  const [activeTab, setActiveTab] = useState("Employee");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    message.success(`${activeTab} Terms & Conditions updated successfully!`);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Pick content based on active tab
  const currentContent =
    activeTab === "Employee" ? employeeTermsContent : clientTermsContent;
  const setCurrentContent =
    activeTab === "Employee" ? setEmployeeTermsContent : setClientTermsContent;

  return (
    <div className="p-4">
      {/* Header with toggle buttons */}
      <div className="mb-6">
        <Button
          type="primary"
          onClick={() => setActiveTab("Employee")}
          className={`px-[50px] py-[20px] rounded-lg text-[16px] font-medium mr-4 
              ${
                activeTab === "Employee"
                  ? "bg-primary !text-white border-primary"
                  : "bg-white !text-secondary border-primary hover:bg-primary hover:!text-white"
              }`}
        >
          Employee
        </Button>

        <Button
          type="primary"
          onClick={() => setActiveTab("Client")}
          className={`px-[50px] py-[20px] rounded-lg text-[16px] font-medium 
              ${
                activeTab === "Client"
                  ? "bg-primary !text-white border-primary"
                  : "bg-white !text-secondary border-primary hover:bg-primary hover:!text-white"
              }`}
        >
          Client
        </Button>
      </div>
      <div className="border p-6 rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[30px] font-bold">Terms & Conditions</h2>
          {/* <div className="flex gap-3">
          <Button
            onClick={showModal}
            className="bg-primary !text-white hover:!text-secondary hover:!bg-white hover:!border-primary px-[50px] py-[20px] rounded-lg text-[16px] font-medium"
          >
            Update Terms & Conditions
          </Button>
        </div> */}
        </div>

        {/* Display content */}
        <div className="saved-content mt-6 bg-white">
          <div
            dangerouslySetInnerHTML={{ __html: currentContent }}
            className="prose max-w-none"
          />
        </div>
      </div>

      {/* Modal with editor */}
      <Modal
        title={`Update ${activeTab} Terms & Conditions`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width="65%"
        footer={[
          <Button
            key="cancel"
            onClick={handleCancel}
            className="bg-red-500 text-white border-red-500 hover:text-red-500"
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handleOk}
            className="bg-primary text-white"
          >
            Update Terms & Conditions
          </Button>,
        ]}
      >
        {isModalOpen && (
          <div className="mb-6">
            <JoditEditor
              ref={editor}
              value={currentContent}
              onChange={(newContent) => {
                setCurrentContent(newContent);
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TermsAndCondition;
