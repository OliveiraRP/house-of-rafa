import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-20%",
    opacity: direction > 0 ? 1 : 0,
    zIndex: direction > 0 ? 2 : 1,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
    transition: { x: { type: "spring", stiffness: 300, damping: 30 } },
  },
  exit: (direction) => ({
    x: direction > 0 ? "-20%" : "100%",
    opacity: direction > 0 ? 0 : 1,
    zIndex: direction > 0 ? 1 : 2,
  }),
};

export function ViewSwitcher({ view, direction, children }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={view}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            boxShadow: direction < 0 ? "-10px 0 30px rgba(0,0,0,0.3)" : "none",
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
