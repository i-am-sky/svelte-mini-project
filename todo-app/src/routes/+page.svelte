<script lang="ts">
	let todos = $state([
		{ id: 1, text: 'Buy milk', completed: false },
		{ id: 2, text: 'Walk the dog', completed: false }
	]);

	let userInput: string = $state('');

	let completedCount = $derived(todos.filter((todo) => todo.completed).length);

	function addTodo() {
		if (userInput) {
			todos.push({ id: todos.length + 1, text: userInput, completed: false });
			userInput = '';
		}
	}

	function toggleCompleted(id: number) {
		todos = todos.map((todo) => {
			if (todo.id === id) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
	}

	function removeTodo(id: number) {
		todos = todos.filter((todo) => todo.id !== id);
	}
</script>

<div class="container mx-auto w-[600px]">
	<h1 class="mb-4 text-3xl font-bold"></h1>

	<div class="input-cnt flex justify-evenly"></div>
	<input
		id="new-todo"
		type="text"
		bind:value={userInput}
		placeholder="Add new todo"
		class="mb-2 min-w-[400px] grow rounded border border-gray-300 p-2"
	/>
	<button
		onclick={addTodo}
		class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">Add Todo</button
	>
	<p>Completed: {completedCount}</p>
	<ul class="list-none">
		{#each todos as todo}
			<li class="mb-2 flex max-w-[700px] justify-center">
				<input
					type="checkbox"
					checked={todo.completed}
					onclick={() => toggleCompleted(todo.id)}
					class="mr-2"
					id={todo.id + ''}
				/>
				<label
					for={todo.id + ''}
					class={todo.completed
						? 'text-gray-500 line-through ' + ' ms-2 mt-[3px] grow'
						: 'text-black' + ' ms-2 mt-[3px] grow'}>{todo.text}</label
				>
				<button
					onclick={() => removeTodo(todo.id)}
					class="ml-2 rounded bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
					>Remove</button
				>
			</li>
		{/each}
	</ul>
</div>
