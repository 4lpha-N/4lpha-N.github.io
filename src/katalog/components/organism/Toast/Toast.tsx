import { useCallback, useContext, useRef, useState } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ThemeClassContext } from "../../../lib/ThemeClassContext";
import { ToastContext } from "../../../lib/ToastContext";
import type { ToastInput } from "../../../lib/ToastContext";
import { cx } from "../../../lib/cx";
import { VlAlert } from "../../molecules/Alert/Alert";

const TOAST_MS = 5000;

// Stellt useToast() bereit und zeigt die Meldungen unten rechts; muss im ThemeProvider liegen
export function ToastProvider({ children }: { children: ReactNode }) {
  const themeClass = useContext(ThemeClassContext);
  const reduceMotion = useReducedMotion();
  const [toasts, setToasts] = useState<(ToastInput & { id: number })[]>([]);
  const counter = useRef(0);

  const push = useCallback((toast: ToastInput) => {
    const id = ++counter.current;
    setToasts((list) => [...list.slice(-3), { ...toast, id }]);
  }, []);
  const remove = (id: number) =>
    setToasts((list) => list.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={push}>
      {children}
      {createPortal(
        <div
          className={cx("design-wrapper", themeClass, "vl-toasts")}
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {toasts.map((t) => (
              <motion.div
                key={t.id}
                layout={!reduceMotion}
                className="vl-toast-wrap"
                initial={reduceMotion ? false : { opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 40 }}
                transition={{ duration: reduceMotion ? 0 : 0.25 }}
              >
                <VlAlert
                  tone={t.tone}
                  title={t.title}
                  live={false}
                  action={
                    t.action && {
                      label: t.action.label,
                      onClick: () => {
                        t.action?.onClick();
                        remove(t.id);
                      },
                    }
                  }
                  onClose={() => remove(t.id)}
                  extra={
                    <span
                      className="vl-alert__timer"
                      style={{ animationDuration: `${TOAST_MS}ms` }}
                      onAnimationEnd={() => remove(t.id)}
                    />
                  }
                >
                  {t.text}
                </VlAlert>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
