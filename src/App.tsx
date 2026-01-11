import { Alignment, Fit, Layout, useRive } from "rive-react";
import "./App.css";

function App() {
  const { RiveComponent, rive } = useRive({
    src: "/gift3.riv",
    // autoplay: true,
    stateMachines: "State Machine 1",
    autoplay: true,
    layout: new Layout({
      fit: Fit.FitHeight,
      alignment: Alignment.TopCenter,
    }),
    artboard: "tier_up_popup",
    onLoadError: (error) => {
      console.error("Error loading Rive animation:", error);
    },
    onStateChange: (stateMachineName) => {
      console.log(`State changed in`, stateMachineName);
    },
    onRiveReady(rive) {
      // find trigger
      if (!rive) return;
      rive.resizeToCanvas();
      const stateMachine = rive.stateMachineInputs("State Machine 1");
      console.log(stateMachine);
      if (stateMachine) {
        const trigger = stateMachine.find((input) => input.name === "bronze");
        if (trigger) {
          trigger.fire();
        } else {
          console.warn(`Trigger not found in state machine`);
        }
      } else {
        console.warn(`State machine not found for trigger`);
      }
    },
    onLoad: () => {
      console.log("Rive animation loaded", rive);
    },
  });

  return (
    <>
      <RiveComponent
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </>
  );
}

export default App;
