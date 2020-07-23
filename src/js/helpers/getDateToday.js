export default function getDateToday() {
	const timeNow = new Date();
	const todayDay = timeNow.getDate();
	const todayMonth = timeNow.getMonth();
	const todayYear = timeNow.getFullYear();

	return `${todayDay}${todayMonth}${todayYear}`;
}
