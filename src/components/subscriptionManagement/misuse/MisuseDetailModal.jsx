import { Modal } from "antd";
import { getImageUrl } from "../../common/imageUrl";

export default function MisuseDetailModal({
  visible,
  onCancel,
  selectedRecord,
}) {
  return (
    <Modal
      open={!!visible}
      onCancel={onCancel}
      footer={null}
      width={900}
      title="Misuse Report Details"
    >
      <div className="p-4">
        {/* User Information */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Reporter Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-semibold">
                {[
                  selectedRecord?.user?.firstName,
                  selectedRecord?.user?.middleName,
                  selectedRecord?.user?.lastName,
                ]
                  .filter(Boolean)
                  .join(" ") || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-semibold">
                {selectedRecord?.user?.email || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Subject of Complaint */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Subject of the Complaint
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-semibold">
                {selectedRecord?.subjectOfTheComplaint?.name || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-semibold">
                {selectedRecord?.subjectOfTheComplaint?.email || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Role:</p>
              <p className="font-semibold capitalize">
                {selectedRecord?.subjectOfTheComplaint?.employee || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Known to Reporter:</p>
              <p className="font-semibold">
                {selectedRecord?.khowThisPerson ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Nature of the Reported Misconduct */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Nature of the Reported Misconduct
          </h3>
          {selectedRecord?.natureOfTheReported &&
          selectedRecord.natureOfTheReported.length > 0 ? (
            <ul className="list-disc pl-5">
              {selectedRecord.natureOfTheReported.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No misconduct reported</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Description</h3>
          <p className="font-normal whitespace-pre-line">
            {selectedRecord?.description || "N/A"}
          </p>
        </div>

        {/* Resolution Requested */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Resolution Requested
          </h3>
          {selectedRecord?.resolutionRequested &&
          selectedRecord.resolutionRequested.length > 0 ? (
            <ul className="list-disc pl-5">
              {selectedRecord.resolutionRequested.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No resolution specified</p>
          )}
        </div>

        {/* Status and Affirmation */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Report Status
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Status:</p>
              <p className="font-semibold capitalize">
                {selectedRecord?.status?.toLowerCase().replace(/_/g, " ") ||
                  "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Affirmation & Signature:</p>
              <p className="font-semibold">
                {selectedRecord?.affirmationAndSignature ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Supporting Documents */}
        {selectedRecord?.supportingDocument &&
          selectedRecord.supportingDocument.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3 border-b pb-2">
                Supporting Documents
              </h3>
              <ul className="list-disc pl-5">
                {selectedRecord.supportingDocument.map((file, index) => (
                  <li key={index} className="mb-1">
                    <a
                      href={getImageUrl(file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {file.split("/").pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Timestamps */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Submission Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Created At:</p>
              <p className="font-semibold">
                {selectedRecord?.createdAt
                  ? new Date(selectedRecord.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Last Updated:</p>
              <p className="font-semibold">
                {selectedRecord?.updatedAt
                  ? new Date(selectedRecord.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
