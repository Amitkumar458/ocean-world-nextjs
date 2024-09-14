import React from "react";

type Props = {
  children: React.ReactNode;
};

function InteractionEvent(props: Readonly<Props>) {
  React.useEffect(() => {
    const mutationObserver = new MutationObserver((e) => {
      const { addedNodes, removedNodes } = e[0];
      
      let swalMutationObserver = new MutationObserver((e) => {
        const node = e[0].target as HTMLElement;
        node.style.display = "grid";
      });
      
      if (addedNodes.length) {
        for (let nodeEle of addedNodes) {
          const node = nodeEle as HTMLElement;
          if (node.className.includes("swal2-container")) {
            swalMutationObserver.observe(node, {
              childList: false,
              attributes: true,
            });
          }
        }
      }
      if (removedNodes.length) {
        for (let nodeEle of removedNodes) {
          const node = nodeEle as HTMLElement;
          if (node.className.includes("swal2-container")) {
            swalMutationObserver.disconnect();
          }
        }
      }
    });
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: false,
      attributes: true,
    });
    return () => {
      mutationObserver.disconnect();
    };
  }, []);
  return <>{props.children}</>;
}

export default InteractionEvent;
