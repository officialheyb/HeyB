import { MessageCircle } from "lucide-react";

export function LiveChat() {
  // WhatsApp direct link
  const openWhatsApp = () => {
    const phoneNumber = "2349133826633"; // WhatsApp number in international format (Nigeria)
    const defaultMessage = "Hi HeyB, I need assistance with...";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`, '_blank');
  };

  return (
    <>
      {/* Chat Button - Direct WhatsApp */}
      <button
        onClick={openWhatsApp}
        className="fixed bottom-6 right-4 md:right-6 w-14 h-14 bg-gradient-to-r from-primary via-secondary to-accent text-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 z-40 flex items-center justify-center group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    </>
  );
}
