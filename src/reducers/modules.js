import modules from "../data/modules.json";

let sorted_module_keys = Object.keys(modules).sort((a, b) => {
    if (a.startsWith("P")){
        if(!b.startsWith("P")){
            return -1;
        }
        return parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10);
    }
    return b.startsWith("P")? 1: parseInt(a, 10) - parseInt(b, 10);
});

let exported_modules = sorted_module_keys.map((key) => {
        let sorted_topics = modules[key].topics.sort((el1, el2) => {
            let el1_numbers = el1.file.match(/\d+$/);
            let el2_numbers = el2.file.match(/\d+$/);

            let last_number_el1 = parseInt(el1_numbers[0], 10);
            let last_number_el2 = parseInt(el2_numbers[0], 10);

            return last_number_el1 - last_number_el2;
        });

        return {
            module_id: key,
            color: modules[key].color,
            name: modules[key].name,
            topics: sorted_topics
        };
    });


export default function() {
    return exported_modules;
};
