type WelcomeScreenProps = {
  onLoginClick: () => void;
};

function WelcomeScreen({ onLoginClick }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-100 text-center px-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to TaskHub</h1>
      <p className="text-lg text-gray-600 mb-6">
        Please login to continue
      </p>
      <button
        onClick={onLoginClick}
        className="bg-fuchsia-500 text-white text-base px-6 py-4 cursor-pointer rounded-2xl hover:bg-fuchsia-800 transition-colors"
      >
        Login
      </button>
    </div>
  );
}

export default WelcomeScreen;
