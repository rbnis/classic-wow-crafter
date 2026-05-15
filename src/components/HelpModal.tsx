interface Props {
  onClose: () => void
}

export default function HelpModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 mx-4 max-w-sm w-full flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">How to use</h2>
          <button onClick={onClose} className="hover:opacity-70 transition-opacity" aria-label="Close">
            <i className="fa-solid fa-xmark text-xl" />
          </button>
        </div>
        <ol className="flex flex-col gap-2 list-decimal list-inside">
          <li>Select your profession.</li>
          <li>Enter the quantity of each item you wish to craft.</li>
          <li>See what reagents you will need to complete your order.</li>
        </ol>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          I want to craft 6 X and 4 Y and 8 Z... So what reagents do I need?
        </p>
      </div>
    </div>
  )
}
