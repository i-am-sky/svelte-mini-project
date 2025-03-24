<script>
    import { writable } from "svelte/store";
  
    let items = writable(["🍎", "🍌", "🚗", "✈️"]);
    let boxes = writable([[], [], [], []]); 
  
    let draggedItem = null;
    let draggedFromBox = null; // Track where the item came from
    let draggedFromLeftPanel = false; // Track if dragged from left panel
  
    // When dragging starts, store the dragged item and its source
    function onDragStart(event, item, fromBox = null) {
      draggedItem = item;
      draggedFromBox = fromBox;
      draggedFromLeftPanel = fromBox === null;
      event.dataTransfer.setData("text/plain", item);
    }
  
    // Allow dragging over boxes
    function onDragOver(event) {
      event.preventDefault(); // Necessary to allow dropping
    }
  
    // Handle dropping into a box
    function onDrop(event, index) {
  event.preventDefault();

  if (draggedItem) {
    boxes.update((b) => {
      let newBoxes = [...b];

      // Ensure the box is empty or contains the same category
      if (
        newBoxes[index].length === 0 || 
        (isFruit(newBoxes[index][0]) && isFruit(draggedItem)) ||
        (isVehicle(newBoxes[index][0]) && isVehicle(draggedItem))
      ) {
        // Remove from previous box if applicable
        if (draggedFromBox !== null) {
          newBoxes[draggedFromBox] = newBoxes[draggedFromBox].filter(
            (item) => item !== draggedItem
          );
        }

        // Add item to the new box
        newBoxes[index] = [...newBoxes[index], draggedItem];

        // Remove from left panel if moved into a box
        if (draggedFromLeftPanel) {
          items.update((i) => i.filter((item) => item !== draggedItem));
        }
      }

      resetDraggedItem();
      return newBoxes;
    });
  }
}

function isFruit(item) {
  return ["🍎", "🍌"].includes(item);
}

function isVehicle(item) {
  return ["🚗", "✈️"].includes(item);
}

  
    // Handle dropping outside (return to original position)
    function onDropOutside() {
      if (draggedItem) {
        if (draggedFromBox !== null) {
          // Put the item back in the left panel
          items.update((i) => [...i, draggedItem]);
  
          // Remove it from the box
          boxes.update((b) => {
            let newBoxes = [...b];
            newBoxes[draggedFromBox] = null;
            return newBoxes;
          });
        }
      }
  
      resetDraggedItem();
    }
  
    // Reset dragged item state
    function resetDraggedItem() {
      draggedItem = null;
      draggedFromBox = null;
      draggedFromLeftPanel = false;
    }
  
    // When drag ends, reset if dropped outside valid areas
    function onDragEnd(event) {
      if (!event.defaultPrevented) {
        onDropOutside(); // Handles dropping outside boxes
      }
    }
  </script>
  
  <div class="container">
    <!-- Left Side: Draggable Items -->
    <div class="left">
      {#each $items as item}
        <div
          class="item"
          draggable="true"
          ondragstart={(event) => onDragStart(event, item)}
          ondragend={onDragEnd}
        >
          {item}
        </div>
      {/each}
    </div>
  
    <!-- Right Side: Drop Boxes (Only 1 item per box) -->
    <div class="right">
      {#each $boxes as box, index}
        <div
          class="box {box ? 'filled' : ''}"
          ondragover={onDragOver}
          ondrop={(event) => onDrop(event, index)}
        >
          {#if box}
            <div
              class="item"
              draggable="true"
              ondragstart={(event) => onDragStart(event, box, index)}
              ondragend={onDragEnd}
            >
              {box}
            </div>
          {/if}
        </div>
        <p class='box-label'>box{index+1}</p>
      {/each}
    </div>
  </div>
  
  <style>
    .container {
      display: flex;
      gap: 50px;
    }
    .left {
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .item {
      padding: 10px;   
      width: fit-content;
      background: #242424;
      border: 1px solid #fff;
      cursor: grab;
      text-align: center;
      margin: 2px;
      border-radius: 50%;
    }
    .right {
      display: flex;
      gap: 10px;
    }
    .box {
      width: 100px;
      height: 100px;
      border: 2px dashed gray;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
    }
    .box.filled {
      border: 2px solid rgb(222, 222, 222);
      background: transparent;
      background-color: rgb(62, 62, 62);
    }
    .box-label {
      position: relative;
      top: 100px;
      left: -80px
    }
  </style>
  