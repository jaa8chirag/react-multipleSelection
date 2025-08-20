import { useState } from "react";

function App() {
  const data = [
    {
      id: 1,
      question: "What is React?",
      answer:
        "React is a JavaScript library for building user interfaces using components and a unidirectional data flow."
    },
    {
      id: 2,
      question: "What is a component?",
      answer:
        "A component is a reusable piece of UI that can accept props and manage its own state."
    },
    {
      id: 3,
      question: "What is state vs props?",
      answer:
        "Props are read-only inputs passed from parent to child. State is mutable data owned by a component."
    },
    {
      id: 4,
      question: "What is useEffect used for?",
      answer:
        "useEffect runs side effects like fetching data, setting up subscriptions, or updating the document title."
    }
  ];

  const [selected, setSelected] = useState(null);
  const [enableMultipleSelected, setEnableMultipleSelected] = useState(false);
  const [multiple, setMultiple] = useState([]);

  const handleSingleSelection = (id) => {
    setSelected(id === selected ? null : id);
  };

  const handleMultiSelected = (id) => {
    let copyMultiple = [...multiple];
    const index = copyMultiple.indexOf(id);

    if (index === -1) copyMultiple.push(id);
    else copyMultiple.splice(index, 1);

    setMultiple(copyMultiple);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
      <div className="w-[80%] max-w-xl bg-gray-800 rounded-xl shadow-md divide-y divide-gray-700">
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-gray-200">
            React FAQs Accordion
          </h2>
          <button
            onClick={() => setEnableMultipleSelected(!enableMultipleSelected)}
            className="px-4 py-2 text-sm font-medium bg-pink-600 text-white rounded-lg shadow hover:bg-pink-500 active:scale-95 transition"
          >
            {enableMultipleSelected
              ? "Multiple On"
              : "Multiple Off"}
          </button>
        </div>

        {data && data.length > 0 ? (
          data.map((itemData) => (
            <div key={itemData.id} className="border-b border-gray-700">
              <button
                onClick={
                  enableMultipleSelected
                    ? () => handleMultiSelected(itemData.id)
                    : () => handleSingleSelection(itemData.id)
                }
                className="w-full flex justify-between items-center px-5 py-3 text-left text-base font-medium text-gray-200 hover:bg-gray-700 transition"
              >
                <span>{itemData.question}</span>
                <span>+</span>
              </button>

              {(enableMultipleSelected
                ? multiple.includes(itemData.id)
                : selected === itemData.id) && (
                <div className="px-5 pb-3 text-gray-400 text-sm leading-relaxed">
                  {itemData.answer}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">Data not found</p>
        )}
      </div>
    </div>
  );
}

export default App;
