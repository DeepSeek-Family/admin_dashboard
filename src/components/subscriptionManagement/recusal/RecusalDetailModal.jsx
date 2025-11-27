import { Modal } from "antd";

export default function RecusalDetailModal({
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
      title="Juror Recusal Details"
    >
      <div className="p-4">
        {/* User Information */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            User Information
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

        {/* Conflicts */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">
            Conflict of Interest
          </h3>
          {selectedRecord?.conflict && selectedRecord.conflict.length > 0 ? (
            <ul className="list-disc pl-5">
              {selectedRecord.conflict
                .filter((item) => item && item.trim() !== "")
                .map((item, index) => (
                  <li key={index} className="mb-2">
                    <p className="font-normal">{item}</p>
                  </li>
                ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">
              No conflicts reported
            </p>
          )}
        </div>

        {/* Reason */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 border-b pb-2">Reason</h3>
          <p className="font-normal whitespace-pre-line">
            {selectedRecord?.reason || "N/A"}
          </p>
        </div>

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
