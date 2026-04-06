import { useEffect } from "react";
import { initializePortfolioEffects } from "./portfolioEffects";
import { portfolioMarkup } from "./portfolioMarkup";

function App() {
  useEffect(() => initializePortfolioEffects(), []);

  return <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />;
}

export default App;
