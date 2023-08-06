import "./App.css";
import { Container, Box } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TextArea from "./components/TextArea";
import { useState } from "react";

function App() {
  const OPEN_AI_API_KEY = "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";
  const OPEN_AI_API_URL = "https://api.openai.com/v1/completions";
  const [keywords, setKeywords] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // const extractKeywords = async (text) => {
  //   setIsOpen(true);
  //   setLoading(true);

  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",

  //       Authorization: `Bearer ${OPEN_AI_API_KEY}`,
  //     },
  //     body: JSON.stringify({
  //       model: "text-davinci-003",
  //       prompt:
  //         "Extract Keywords from this text.Make first letter of each word uppercase and seperate with commas\n\n" +
  //         text +
  //         "",
  //       temperature: 0.5,
  //       max_tokens: 60,
  //       frequency_penalty: 0.8,
  //     }),
  //   };

  //   const response = await fetch(OPEN_AI_API_URL, options);
  //   const json = await response.json();
  //   const data = json.choices[0].text.trim();
  //   console.log(data);
  //   setKeywords(data);
  //   setLoading(false);
  // };

  const extractKeywords = async (text) => {
    setIsOpen(true);
    setLoading(true);

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${OPEN_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt:
          "Extract Keywords from this text. Make the first letter of each word uppercase and separate with commas\n\n" +
          text +
          "",
        temperature: 0.5,
        max_tokens: 60,
        frequency_penalty: 0.8,
      }),
    };

    try {
      const response = await fetch(OPEN_AI_API_URL, options);
      const json = await response.json();

      if (
        json &&
        json.choices &&
        json.choices.length > 0 &&
        json.choices[0].text
      ) {
        const data = json.choices[0].text.trim();
        console.log(data);
        setKeywords(data);
      } else {
        console.error("Invalid API response:", json);
      }
    } catch (error) {
      console.error("Error extracting keywords:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bg="blue.300" color="white" height="100vh" paddingTop={130}>
      <Container maxW="3xl" centerContent>
        <Header />
        <TextArea extractKeywords={extractKeywords} />
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
