module.exports = (query) => {
	const filterState = [
		{
			name: "Tất cả",
			status: "",
			class: ""
		},
		{
			name: "Hoạt động",
			status: "active",
			class: ""
		},
		{
			name: "Dừng hoạt động",
			status: "inactive",
			class: ""
		}
	];

	if (query.status) {
		const index = filterState.findIndex(item => item.status == query.status);
		filterState[index].active = true;
	} else {
		filterState[0].active = true;
	}

	return filterState;
}