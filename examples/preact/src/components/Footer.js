import { useEffect } from 'preact/hooks';
import { pluralize, FILTER, toFilter } from '../utils';
import { todomvc } from '../store';

// ---

todomvc.on('filter:update', (state, filter) => {
	state.filter = filter;
});

todomvc.on('todos:clear', state => {
	state.todos = state.todos.filter(FILTER.active);
});

// ---

function onhashchange() {
	todomvc.dispatch('filter:update', toFilter());
}

function onClear() {
	todomvc.dispatch('todos:clear');
}

export default function (props) {
	const { todos, filter, count } = props;

	useEffect(() => {
		addEventListener('hashchange', onhashchange);
		return () => removeEventListener('hashchange', onhashchange);
	});

	return (
		<footer class="footer">
			<span class="todo-count">
				<strong>{count}</strong> {pluralize(count, 'item')} left
			</span>

			<ul class="filters">
				<li><a href="#/" class={filter == 'all' && 'selected'}>All</a></li>
				<li><a href="#/active" class={filter == 'active' && 'selected'}>Active</a></li>
				<li><a href="#/completed" class={filter == 'completed' && 'selected'}>Completed</a></li>
			</ul>

			{
				(todos.length - count) > 0 && (
					<button class="clear-completed" onclick={onClear}>Clear completed</button>
				)
			}
		</footer>
	);
}
