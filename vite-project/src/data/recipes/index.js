const modules = import.meta.glob('./*.json', { eager: true });
const recipes = Object.values(modules).map(m => m.default);

export default recipes;