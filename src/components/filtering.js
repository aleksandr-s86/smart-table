export function initFiltering(elements) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            const selectEl = elements[elementName];
            if(!selectEl || selectEl.tagName !== 'SELECT') return;

            selectEl.innerHTML = '';
            Object.values(indexes[elementName]).forEach((name) => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                selectEl.appendChild(el);
            });
        });
    };
    
    const applyFiltering = (query, state, action) => {
        if(!action) {
            return query;
        }

        const target = action.target;
        if(!target) {
            return query;
        }

        // @todo: #4.2 — обработать очистку поля
        if(action.name === 'clear') {

            const parent = typeof target.closest === 'function' ? target.closest('.filter-group') : null;
            if(parent) {
                const input = parent.querySelector('input');
                if(input) {
                    input.value = '';
                }
                const fieldName = action.dataset?.field;
                if(state.filters && fieldName) {
                    state.filters[fieldName] = '';
                }
            }
            return query;
        }
        
        // @todo: #4.5 — отфильтровать данные 
        const filter = {};
        Object.keys(elements).forEach((key) => {
            const el = elements[key];
            if (!el) return;
            
            if(['INPUT', 'SELECT'].includes(el.tagName) && el.value) {
                const fieldName = el.name || key;
                filter[`filter[${fieldName}]`] = el.value;
            }
        });

        return Object.keys(filter).length ? { ...query, ...filter } : query;
    };

    return {
        updateIndexes,
        applyFiltering
    };   
}