<script>
  import { writable } from "svelte/store";
  import Toast from "../Toast.svelte";

  let img_path = "src/assets/images/";
  // let items = writable(["🍎", "🍌", "🚗", "✈️"]);
  let items = writable(["apple", "banana", "orange", "strawberry"]);
  let boxes = writable([null, null, null, null]);

  let score = writable(0);
  let attempts = writable(0);

  let draggedItem = null;
  let draggedFromBox = null;
  let draggedFromLeftPanel = false;

  let toastMessage = writable("");
  let showToast = writable(false);

  const correctMapping = ["apple", "banana", "orange", "strawberry"];

  function onDragStart(event, item, fromBox = null) {
    draggedItem = item;
    draggedFromBox = fromBox;
    draggedFromLeftPanel = fromBox === null;
    event.dataTransfer.setData("text/plain", item);
  }

  function onDragOver(event) {
    event.preventDefault();
  }

  function onDrop(event, index) {
    event.preventDefault();

    if (draggedItem) {
      boxes.update((b) => {
        let newBoxes = [...b];

        // if item is dragged from one box to other box then empty the old box
        if (draggedFromBox !== null) {
          newBoxes[draggedFromBox] = null;
        }

        // Place the dragged item in the new box
        newBoxes[index] = draggedItem;
        updateScoreAndAttempts(index, draggedItem, false);
        resetDraggedItem();

        //if the box is already has an item, then reset the dragged item (put is back to its old place)
        // if (newBoxes[index] !== null) {
        //   resetDraggedItem();
        //   return newBoxes;
        // }

        // Remove dragged item from left panel if it's dragged from it
        // if (draggedFromLeftPanel) {
        //  items.update((i) => i.filter((item) => item !== draggedItem));
        // }

        return newBoxes;
      });
    }
  }

  function updateScoreAndAttempts(
    index = null,
    draggedItem = null,
    isOutside = false
  ) {
    attempts.update((n) => n + 1); // Always increment attempts

    if (isOutside) {
      // If dropped outside, decrease score if it was previously correct
      if (index !== null && correctMapping[index] === draggedItem) {
        score.update((n) => (n > 0 ? n - 1 : 0));
      }
    } else {
      // If dropped in a box, check correctness
      score.update((currentScore) => {
        if (correctMapping[index] === draggedItem) {
          let newScore = currentScore + 1;
          if (newScore === correctMapping.length) {
            showToastMessage("All matches are correct!");
          }
          return newScore;
        } else {
          showToastMessage("Wrong match, try again!");
          return currentScore - 1;
        }
      });
    }
  }

  function onDropOutside() {
    if (draggedItem) {
      if (draggedFromBox !== null) {
        // Put back dragged item to left panel if it's dragged from a box
        // items.update((i) => [...i, draggedItem]);

        boxes.update((b) => {
          let newBoxes = [...b];
          newBoxes[draggedFromBox] = null;
          return newBoxes;
        });

        updateScoreAndAttempts(draggedFromBox, draggedItem, true);
      }
    }
    resetDraggedItem();
  }

  function resetDraggedItem() {
    draggedItem = null;
    draggedFromBox = null;
    draggedFromLeftPanel = false;
  }

  function onDragEnd(event) {
    if (!event.defaultPrevented) {
      onDropOutside();
    }
  }

  function showToastMessage(message) {
    toastMessage.set(message);
    showToast.set(true);

    setTimeout(() => {
      showToast.set(false);
    }, 3000);
  }

  function submitResults() {
    boxes.subscribe((b) => {
      let allCorrect = b.every((item, idx) => item === correctMapping[idx]);
      if (allCorrect) {
        showToastMessage("All matches are correct!");
      } else {
        showToastMessage(`Missing or incorrect items`);
      }
    });
  }

</script>

<div class="container">
  <div>
    <h4>
      {`Your Score: ${$score} ; 
       Attempts: ${$attempts}`}
    </h4>
  </div>
  <div class="left items">
    {#each $items as item}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="item"
        draggable="true"
        ondragstart={(event) => onDragStart(event, item)}
        ondragend={onDragEnd}
      >
        <!-- {item} -->
        <img src={`${img_path}${item}.png`} alt={item} />
      </div>
    {/each}
  </div>

  <div class="right boxes">
    {#each $boxes as box, index}
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="box {box ? 'filled' : ''} {correctMapping[index] === box
          ? 'correctMatch'
          : 'wrongMatch'}"
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
            <!-- {box} -->
            <img src={`${img_path}${box}.png`} alt="" />
          </div>
        {:else}
          <div class="placeholder-text">
            <!-- {correctMapping[index]} -->
            <img src={`${img_path}${correctMapping[index]}.png`} alt="" />
          </div>
        {/if}
      </div>
      <p class="box-label">{correctMapping[index]}</p>
    {/each}
  </div>

  <Toast message={$toastMessage} show={$showToast} />
  <button onclick={submitResults}>Submit</button>
</div>

<style>
  .container {
    display: flex;
    gap: 50px;
    height: 500px;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .items {
    /* width: 200px; */
    display: flex;
    flex-direction: row;
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
  .boxes {
    display: flex;
    gap: 10px;
    justify-content: space-around;
  }
  .box {
    width: 100px;
    height: 100px;
    border: 2px dashed gray;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 50% ;
  }
  .box.filled {
    border: 2px solid rgb(222, 222, 222);
    background: transparent;
    background-color: rgb(62, 62, 62);
  }
  .box-label {
    position: relative;
    top: 120px;
    left: -110px;
  }

  .placeholder-text {
    /* scale: 1.5; */
    opacity: 0.6;
    pointer-events: none; /* So the text doesn't interfere with dropping */
    filter: grayscale(1);
  }
  img {
    height: 100px;
    width: 100px;
  }
  .boxes .item {
    padding: unset;
    border: unset;
    background: unset;
  }
  .correctMatch {
    border-color: rgb(57, 255, 47) !important;
    box-shadow: 0 0 10px rgb(57, 255, 47);
  }
  .wrongMatch {
    border-color: rgb(255, 67, 67) !important;
    box-shadow: 0 0 10px rgb(255, 67, 67);
  }
</style>
