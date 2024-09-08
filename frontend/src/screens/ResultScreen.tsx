function ResultScreen() {
  return (
    <>
      <span className="text-fancy text-8xl">YOU WON!</span>
      <span className="text-fancy">Winner winner NFT dinner</span>
      <img
        src="/rock-optimized.svg"
        alt=""
        className="absolute top-[100px] left-[100px] w-[200px] rotate-[35deg]"
      />
      <img
        src="/paper-optimized.svg"
        alt=""
        className="absolute top-[400px] right-[10px] w-[250px] rotate-[-15deg]"
      />
      <img
        src="/scissors-optimized.svg"
        alt=""
        className="absolute top-[700px] left-[200px] w-[250px] rotate-[75deg]"
      />
    </>
  );
}

export default ResultScreen;
