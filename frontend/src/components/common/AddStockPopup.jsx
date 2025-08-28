import React, { useState } from "react";

// no backend pa to
const AddStockPopup = ({ open, onClose, onSubmit }) => {
  const [itemType, setItemType] = useState("gown");
  const [variant, setVariant] = useState("");
  const [itemStatus, setItemStatus] = useState("In Good Condition");
  const [returnStatus, setReturnStatus] = useState("Returned");
  const [quantity, setQuantity] = useState(1);

  // Options dynamic na sya based sa /items + hardcoded options
  const itemTypes = [
    { value: "cap", label: "Cap" },
    { value: "tassel", label: "Tassel" },
    { value: "gown", label: "Gown" },
    { value: "hood", label: "Hood" },
  ];
  const variants = {
    cap: [{ value: null, label: "N/A" }],
    tassel: [
      { value: "blue", label: "Blue" },
      { value: "maroon", label: "Maroon" },
      { value: "orange", label: "Orange" },
      { value: "white", label: "White" },
      { value: "yellow", label: "Yellow" },
    ],
    gown: [
      { value: "XS", label: "XS" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "2XL", label: "2XL" },
      { value: "3XL", label: "3XL" },
      { value: "4XL", label: "4XL" },
    ],
    hood: [
      { value: "blue", label: "Blue" },
      { value: "maroon", label: "Maroon" },
      { value: "orange", label: "Orange" },
      { value: "white", label: "White" },
      { value: "yellow", label: "Yellow" },
    ],
  };
  const itemStatuses = ["In Good Condition", "For Repair", "Damaged"];
  const returnStatuses = ["Returned", "Not Returned"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (onSubmit)
      onSubmit({
        item_type: itemType,
        variant: 'XS',
        quantity: Number(quantity),
        item_status: itemStatus,
        return_status: returnStatus,

      });
    onClose();
  };

  return (
    <div
      className={`fixed left-0 top-0 right-0 bottom-0 z-[10050] w-full h-full flex justify-center items-center transition-all duration-500 ${open
        ? "opacity-100 pointer-events-auto backdrop-blur-sm"
        : "opacity-0 pointer-events-none"
        }`}
      style={{ background: "rgba(0,0,0,0.4)" }}
    >
      <form
        className="bg-gradient-to-br from-[#0a1a36] to-[#133366] border border-white/20 w-[430px] max-w-[95vw] rounded-3xl shadow-2xl p-8 relative flex flex-col gap-6 animate-slide-up"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-3xl font-extrabold mb-2 text-center tracking-wider drop-shadow-lg flex items-center justify-center gap-2">
          <span className="inline-block align-middle text-2xl">➕</span>
          Add Inventory Stocks
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold tracking-wide">
            Item Type
          </label>
          <select
            className="rounded-lg p-2 bg-[#1a2a4d] text-white focus:outline-none focus:ring-2 focus:ring-[#F3B51A] transition-all"
            value={itemType}
            onChange={(e) => {
              setItemType(e.target.value);
              setVariant("");
            }}
            required
          >
            {itemTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold tracking-wide">
            Variant{" "}
            {itemType === "cap" ? <span className="text-xs">(N/A)</span> : null}
          </label>
          <select
            className="rounded-lg p-2 bg-[#1a2a4d] text-white focus:outline-none focus:ring-2 focus:ring-[#F3B51A] transition-all"
            value={variant}
            onChange={(e) => setVariant(e.target.value)}
            required={itemType !== "cap"}
            disabled={itemType === "cap"}
          >
            {variants[itemType].map((opt) => (
              <option key={opt.value || "na"} value={opt.value || ""}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold tracking-wide">
            Item Status
          </label>
          <select
            className="rounded-lg p-2 bg-[#1a2a4d] text-white focus:outline-none focus:ring-2 focus:ring-[#F3B51A] transition-all"
            value={itemStatus}
            onChange={(e) => setItemStatus(e.target.value)}
            required
          >
            {itemStatuses.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold tracking-wide">
            Return Status
          </label>
          <select
            className="rounded-lg p-2 bg-[#1a2a4d] text-white focus:outline-none focus:ring-2 focus:ring-[#F3B51A] transition-all"
            value={returnStatus}
            onChange={(e) => setReturnStatus(e.target.value)}
            required
          >
            {returnStatuses.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white font-semibold tracking-wide">
            Quantity
          </label>
          <input
            type="number"
            min={1}
            className="rounded-lg p-2 bg-[#1a2a4d] text-white focus:outline-none focus:ring-2 focus:ring-[#F3B51A] transition-all"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, parseInt(e.target.value) || 1))
            }
            required
          />
        </div>
        <div className="flex gap-4 mt-8 justify-center">
          <button
            type="button"
            className="bg-gray-400/80 text-white px-6 py-2 rounded-lg hover:bg-gray-500 font-semibold transition-all duration-200 shadow-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#0C7E48] to-[#1db954] text-white px-6 py-2 rounded-lg hover:from-[#0A6F40] hover:to-[#159c3f] font-semibold transition-all duration-200 shadow-md"
          >
            Add Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStockPopup;
