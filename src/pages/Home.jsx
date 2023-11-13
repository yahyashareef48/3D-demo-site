import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "../config/motion";
import state from "../store";
import { Button } from "../components";

export default function Home() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header {...slideAnimation("down")}>
            <img src="./threejs.png" alt="three.js logo" className="w-8 h-8 object-contain" />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className=" xl:hidden block" /> DO IT
              </h1>
            </motion.div>

            <motion.div {...headContainerAnimation}>
              <p className="max-w-md font-normal text-gray-600 text-base">
                Design your unique shirt effortlessly with our AI tool. Personalize your style and
                unleash your creativity. Your perfect shirt is just a click away!
              </p>
              <Button
                type="filled"
                onClick={() => (state.intro = false)}
                className=" w-fit px-4 py-2.5 font-bold text-sm"
              >
                Customize It
              </Button>
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
