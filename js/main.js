<script type="text/javascript">

	Top=window.open("http://vsetaksi.ru/",'vsetaksi', 'toolbar=1, location=1, status=1, menubar=1, scrollbars=1, resizable=1');
	window.focus() ;

</script>


let move_array = [];
let move_objects = document.querySelectorAll('[data-move]');
if (move_objects.length > 0) {
	for (let index = 0; index < move_objects.length; index++) {
		let el = move_objects[index];
		let data_move = el.getAttribute('data-move');
		if (data_move != '' || data_move != null) {
			el.setAttribute('data-move-index', index);
			move_array[index] = {
				'parent': el.parentNode,
				"index": index_in_parent(el)
			};
		}
	}
}

function dynamic_adapt() {
	let w = document.querySelector('body').offsetWidth;
	if (move_objects.length > 0) {
		for (let index = 0; index < move_objects.length; index++) {
			let el = move_objects[index];
			let data_move = el.getAttribute('data-move');
			if (data_move != '' || data_move != null) {
				let data_array = data_move.split(',');
				let data_parent = document.querySelector('.' + data_array[0]);
				let data_index = data_array[1];
				let data_bp = data_array[2];
				if (w < data_bp) {
					if (!el.classList.contains('js-move_done_' + data_bp)) {
						if (data_index > 0) {
							let actual_index = index_of_elements(data_parent)[data_index];
							data_parent.insertBefore(el, data_parent.childNodes[actual_index]);
						} else {
							data_parent.insertBefore(el, data_parent.firstChild);
						}
						el.classList.add('js-move_done_' + data_bp);
					}
				} else {
					if (el.classList.contains('js-move_done_' + data_bp)) {
						dynamic_adaptive_back(el);
						el.classList.remove('js-move_done_' + data_bp);
					}
				}
			}
		}
	}
}		