import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import state from "../store";
import { slideAnimation } from "../config/motion";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { Tab, Button, ColorPicker, FilePicker, AIPicker } from "../components";
import { useState } from "react";
import { reader } from "../config/helpers";

export default function Customizer() {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");

  const [prompt, setPrompt] = useState();
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({ logoShirt: true, stylishShirt: false });

  // show tab content depending on the activeTab
  const generateTabContent = (activeTab) => {
    switch (activeTab) {
      case "colorpicker":
        return <ColorPicker />;

      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;

      case "aipicker":
        return <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} onSubmit={handleSubmit} />;

      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if(!prompt) {
      return alert("Please enter a prompt")
    }

    try {
      
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false)
      setActiveEditorTab("")
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;

      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isFullTexture = false;
        state.isLogoTexture = true;
    }

    setActiveFilterTab((oldState) => ({...oldState, [tabName]: !oldState[tabName]}));
  };

  const handleDecals = (type, res) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = res;

    !activeFilterTab[decalType.filterTab] && handleActiveFilterTab(decalType.filterTab);
  };

  const readFile = (type, file) => {
    reader(file).then((res) => {
      handleDecals(type, res);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    onClick={() =>
                      activeEditorTab === tab.name
                        ? setActiveEditorTab("off")
                        : setActiveEditorTab(tab.name)
                    }
                  />
                ))}

                {generateTabContent(activeEditorTab)}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...slideAnimation("down")}>
            <motion.div {...slideAnimation("right")}>
              <Button
                type="filled"
                className="w-fit px-4 py-2.5 font-bold text-sm"
                onClick={async () => {
                  await setActiveEditorTab("off");
                  state.intro = true;
                }}
              >
                Go Back
              </Button>
            </motion.div>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                onClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
