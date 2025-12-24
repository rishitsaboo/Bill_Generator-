import React, { useState, useRef } from "react";
import AddItemModal from "../components/AddItemModalt.tsx";
import RightSide from "../components/right_side.tsx"
import html2canvas from "html2canvas";


/* ---------------------- Types ---------------------- */

type Category =
  | "Namkeens"
  | "Sweets"
  | "Nasta_Items"
  | "Sabzi"
  | "Others";

type Item = {
  id: string;
  name: string;
  image: string;
  amount: number;
};

type AddedItem = Item & {
  qtyType: string;
  kg?: string;
  gram?: string;
  pcs?: string;
  total: number;
};

/* ---------------------- Constants ---------------------- */

const categories: Category[] = [
  "Namkeens",
  "Sweets",
  "Nasta_Items",
  "Sabzi",
  "Others",
];

// prettier-ignore
const items: Record<Category, Item[]> = {

  Namkeens: [
    { id: "All-1", name: "Mathri", image: "mathri.jpg", amount: 300 },
    { id: "All-2", name: "Mathri (wheat)", image: "mathri_wheat.jpg", amount: 300 },
    { id: "All-3", name: "Methi Mathri", image: "methi_mathri.jpg", amount: 300 },
    { id: "All-4", name: "Methi Mathri (wheat)", image: "methi_mathri_wheat.jpg", amount: 300 },
    { id: "All-5", name: "Jeera Mathri", image: "jeera_mathri.jpg", amount: 300 },
    { id: "All-6", name: "Chilli-flakes Mathri", image: "chilli_flakes_mathri.jpg", amount: 300 },
    { id: "All-7", name: "Normal Nimki", image: "normal_nimki.jpg", amount: 300 },
    { id: "All-8", name: "Masala Nimki", image: "masala_nimki.jpg", amount: 300 },
    { id: "All-9", name: "Pudina Nimki", image: "pudina_nimki.jpg", amount: 300 },
    { id: "All-10", name: "Mathri (black pepper)", image: "mathri_black_pepper.jpg", amount: 300 },
    { id: "All-11", name: "Chakri", image: "chakri.jpg", amount: 300 },
    { id: "All-12", name: "Shakar Para", image: "shakar_para.jpg", amount: 300 },
    { id: "All-13", name: "Shakar Para (Wheat)", image: "shakar_para_wheat.jpg", amount: 300 },
    { id: "All-14", name: "Jira Mitha Puri", image: "jira_mitha_puri.jpg", amount: 300 },
    { id: "All-15", name: "Besan Ganthiya", image: "besan_ganthiya.jpg", amount: 300 },
    { id: "All-16", name: "Maouli Sev", image: "maouli_sev.jpg", amount: 300 },
    { id: "All-17", name: "Bhujia", image: "bhujia.jpg", amount: 300 },
    { id: "All-18", name: "Chevda (Poha)", image: "chevda_poha.jpg", amount: 300 },
    { id: "All-19", name: "Chevda (Corn)", image: "chevda_corn.jpg", amount: 300 },
    { id: "All-20", name: "Dry Kachori", image: "dry_kachori.jpg", amount: 320 },
    { id: "All-21", name: "Dry Samosa", image: "dry_samosa.jpg", amount: 320 },
    { id: "All-22", name: "Patra", image: "patra.jpg", amount: 250 },
    { id: "All-23", name: "Idada", image: "idada.jpg", amount: 200 },
    { id: "All-24", name: "Katori (for Katori Chat)", image: "katori.jpg", amount: 420 },
    { id: "All-25", name: "Samosa Papdi", image: "samosa_papdi.jpg", amount: 300 },
    { id: "All-26", name: "Sev Puri", image: "sev_puri.jpg", amount: 300 }
  ],

  Sweets: [
    { id: "Sweets-1", name: "Gulab Jamun (Gits)", image: "gulab_jamun_gits.jpg", amount: 300 },
    { id: "Sweets-2", name: "Khopra Pak (Nariyal Barfi)", image: "khopra_pak_nariyal_barfi.jpg", amount: 500 },
    { id: "Sweets-3", name: "Nariyal Laddu", image: "nariyal_laddu.jpg", amount: 500 },
    { id: "Sweets-4", name: "Mung Dal Halwa", image: "mung_dal_halwa.jpg", amount: 650 },
    { id: "Sweets-5", name: "Ghewar", image: "ghewar.jpg", amount: 650 },
    { id: "Sweets-6", name: "Rabdi Ghewar", image: "rabdi_ghewar.jpg", amount: 800 },
    { id: "Sweets-7", name: "Gund ke Laddu", image: "gund_ke_laddu.jpg", amount: 700 },
    { id: "Sweets-8", name: "Mohan Thal", image: "mohan_thal.jpg", amount: 650 },
    { id: "Sweets-9", name: "Besan Ke Laddu", image: "besan_ke_laddu.jpg", amount: 650 },
    { id: "Sweets-10", name: "Petha", image: "petha.jpg", amount: 320 },
    { id: "Sweets-11", name: "Churme ka Laddu", image: "churme_ka_laddu.jpg", amount: 500 },
    { id: "Sweets-12", name: "Mawa Ghujiya", image: "mawa_ghujiya.jpg", amount: 650 },
    { id: "Sweets-13", name: "Mawa Rava Ghujiya", image: "mawa_rava_ghujiya.jpg", amount: 650 },
    { id: "Sweets-14", name: "Boondi", image: "boondi.jpg", amount: 550 }
  ],

  Nasta_Items: [
    { id: "Nasta_Items-1", name: "Pyaaz Kachori", image: "pyaaz_kachori.jpg", amount: 25 },
    { id: "Nasta_Items-2", name: "Vadapav", image: "vadapav.jpg", amount: 12 },
    { id: "Nasta_Items-3", name: "Butter Vadapav", image: "butter_vadapav.jpg", amount: 15 },
    { id: "Nasta_Items-4", name: "Idli (3Pcs)", image: "idli_3pcs.jpg", amount: 60 },
    { id: "Nasta_Items-5", name: "Chola Tikki", image: "chola_tikki.jpg", amount: 70 },
    { id: "Nasta_Items-6", name: "Pav Bhaji", image: "pav_bhaji.jpg", amount: 70 },
    { id: "Nasta_Items-7", name: "Samosa", image: "samosa.jpg", amount: 15 },
    { id: "Nasta_Items-8", name: "Kachori", image: "kachori.jpg", amount: 20 },
    { id: "Nasta_Items-9", name: "Thepla", image: "thepla.jpg", amount: 12 },
    { id: "Nasta_Items-10", name: "Khaman", image: "khaman.jpg", amount: 240 },
    { id: "Nasta_Items-11", name: "Sev Khamni", image: "sev_khamni.jpg", amount: 250 },
    { id: "Nasta_Items-12", name: "Daal Baati Churma + Gatte", image: "daal_baati_churma_gatte.jpg", amount: 250 },
    { id: "Nasta_Items-13", name: "Dahi Bade (2Pcs)", image: "dahi_bade_2pcs.jpg", amount: 65 },
    { id: "Nasta_Items-14", name: "Kachori Chaat", image: "kachori_chaat.jpg", amount: 60 },
    { id: "Nasta_Items-15", name: "Daal Pakwan (2Pcs)", image: "daal_pakwan_2pcs.jpg", amount: 60 },
    { id: "Nasta_Items-16", name: "Chole Puri (7Pcs)", image: "chole_puri_7pcs.jpg", amount: 60 },
    { id: "Nasta_Items-17", name: "Sabudana Vada (3Pcs)", image: "sabudana_vada_3pcs.jpg", amount: 60 },
    { id: "Nasta_Items-18", name: "Dabeli", image: "dabeli.jpg", amount: 20 }
  ],

  Sabzi: [
    { id: "Sabzi-1", name: "Paneer Butter Masala", image: "paneer_butter_masala.jpg", amount: 450 },
    { id: "Sabzi-2", name: "Palak Paneer", image: "palak_paneer.jpg", amount: 450 },
    { id: "Sabzi-3", name: "Matar Paneer", image: "matar_paneer.jpg", amount: 450 },
    { id: "Sabzi-4", name: "Kadhai Paneer", image: "kadhai_paneer.jpg", amount: 450 },
    { id: "Sabzi-5", name: "Paneer Angara", image: "paneer_angara.jpg", amount: 450 },
    { id: "Sabzi-6", name: "Paneer Tikka", image: "paneer_tikka.jpg", amount: 450 },
    { id: "Sabzi-7", name: "Mix Veg", image: "mix_veg.jpg", amount: 400 },
    { id: "Sabzi-8", name: "Step Gobi", image: "step_gobi.jpg", amount: 400 },
    { id: "Sabzi-9", name: "Dam Aalo", image: "dam_aalo.jpg", amount: 350 },
    { id: "Sabzi-10", name: "Malai Kofta", image: "malai_kofta.jpg", amount: 450 },
    { id: "Sabzi-11", name: "Dal Makhni", image: "dal_makhni.jpg", amount: 450 }
  ],

  Others: [],
};

/* ---------------------- Main Component ---------------------- */

function BillGenerator() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("Namkeens");
  const [billItems, setBillItems] = useState<
    { id: string; name: string; qty: number; amount: number }[]
  >([]);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [customerName, setCustomerName] = useState<string>("");

  const billRef = useRef<HTMLDivElement | null>(null);
  const handleGenerateBill = async () => {
    console.log("Generate Bill button clicked");
    try {
      const billElement = document.getElementById("bill-preview");
      if (!billElement) {
        console.error("Bill preview element not found");
        return;
      }

      // Wait for images to load
      const images = billElement.querySelectorAll('img');
      await Promise.all([...images].map(img => 
        img.complete ? Promise.resolve() : new Promise(resolve => { img.onload = resolve; })
      ));

      const canvas = await html2canvas(billElement  , {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });

      const link = document.createElement("a");
      link.download = `bill-${Date.now()}.jpg`;
      link.href = canvas.toDataURL("image/jpeg", 0.95);
      link.click();

    } catch (error) {
      console.error("Error generating bill:", error);
    }
  };

  /* ---------------------- Render ---------------------- */

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <div className="h-16 bg-blue-600 text-white flex items-center px-4 shadow-md border-b mb-2">
        <h1 className="text-xl font-semibold">Quick Bill</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* ---------- LEFT SIDE: Categories & Items ---------- */}
        <div className="w-full bg-white p-4 border-l">
          {/* Categories */}
          <div className="overflow-x-auto whitespace-nowrap flex space-x-2 bg-gray-100 pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-white shadow text-gray-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items List */}
          <div className="mt-4">
            <h2 className="font-semibold mb-2">{selectedCategory}</h2>

            {items[selectedCategory].length === 0 ? (
              <p className="text-gray-500">No items</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {items[selectedCategory].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      setCurrentItem(item);
                      setShowModal(true);
                    }}
                    className="bg-white rounded-xl p-2 shadow hover:shadow-lg cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <p className="text-center mt-2 font-medium">{item.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* ---------- Modal ---------- */}
        {showModal && currentItem && (
          <AddItemModal
            item={currentItem}
            onClose={() => setShowModal(false)}
            onAdd={(addedItem: AddedItem) => {
              const qty =
                addedItem.qtyType === "Kg"
                  ? parseFloat(addedItem.kg || "0") +
                    parseFloat(addedItem.gram || "0") / 1000
                  : parseFloat(addedItem.pcs || "0");

              setBillItems((prev) => [
                ...prev,
                {
                  id: addedItem.id,
                  name: addedItem.name,
                  qty,
                  amount: addedItem.total,
                },
              ]);

              setShowModal(false);
            }}
          />
        )}
        <div className="flex-1 border-l border-gray-300 overflow-hidden">
          <RightSide billItems={billItems} />
          <button
            onClick={handleGenerateBill}
            className="w-full py-6 text-base font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors lg:col-span-2">
            Generate Bill (JPG)
          </button>
        </div>
      </div>
    </div>
  );
}
export default BillGenerator;
