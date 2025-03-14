<script>
    let todos= $state([]);

    function addTodo(e) {
        todos.push({
            text: e.target.value,
            done: false
        })
    }

</script>

<input on:keydown={addTodo}>

{#each todos as todo} 
<input type="text" bind:value={todo.text} readonly>
<input type="checkbox" bind:checked={todo.done}>
{/each}