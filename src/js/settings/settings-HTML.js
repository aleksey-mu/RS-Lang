const settingsHTML = `
<div class="app-settings-wrapper">
	<form class="settings-form">
		<div class="form-group">
			<label for="wordsCountNew"
				>Количество новых слов в день:</label
			>
			<input
				class="form-control"
				type="number"
				id="wordsCountNew"
				name="wordsCountNew"
				placeholder="1-50"
				min="1"
				max="50"
			/>
		</div>

		<div class="form-group">
			<label for="wordsCountAll"
				>Общее количество слов в день (новые + на изучении):</label
			>
			<input
				class="form-control"
				type="number"
				id="wordsCountAll"
				aria-describedby="wordsCountAll-Help"
				name="wordsCountAll"
				placeholder="1-50"
				min="1"
				max="50"
			/>
		</div>

		<div class="form-group">
            <label>Информация, выводимая на карточках (минимум 1):</label>
            <div class="form-check">
				<input
					type="checkbox"
					class="form-check-input"
					id="wordHelpTranslate"
					checked
				/>
				<label class="form-check-label" for="wordHelpTranslate"
					>Перевод слова</label
				>
			</div>
			<div class="form-check">
				<input
					type="checkbox"
					class="form-check-input"
					id="wordHelpMeaning"
					checked
				/>
				<label class="form-check-label" for="wordHelpMeaning"
					>Предложение с объяснением значения слова</label
				>
			</div>
			<div class="form-check">
				<input
					type="checkbox"
					class="form-check-input"
					id="wordHelpExample"
					checked
				/>
				<label class="form-check-label" for="wordHelpExample"
					>Предложение с примером использования изучаемого
					слова</label
				>
			</div>
		</div>
		<div class="form-group">
			<label>Показывать ли транскрипцию?</label>
			<div class="form-check form-check-inline">
				<input
					class="form-check-input"
					type="radio"
					name="wordHelpTranscription"
					id="wordHelpTranscription-true"
					value="true"
					checked
				/>
				<label
					class="form-check-label"
					for="wordHelpTranscription-true"
					>Да</label
				>
			</div>
			<div class="form-check form-check-inline">
				<input
					class="form-check-input"
					type="radio"
					name="wordHelpTranscription"
					id="wordHelpTranscription-false"
					value="false"
				/>
				<label
					class="form-check-label"
					for="wordHelpTranscription-false"
					>Нет</label
				>
			</div>
		</div>
        <div class="settings-info-field"></div>
        <div class="settings-save-btn-wrapper">
        <button type="submit" class="btn btn-primary settings-save-btn">Сохранить</button>
        </div>
	</form>
</div>
`;

export default settingsHTML;
