const unidecode = require("unidecode");

module.exports.convertToSlug = (text) => {
    //Loại bỏ dấu tiếng Việt và các ký tự đặc biệt
    const unidecodeText = unidecode(text)

    const slug = unidecodeText
        .replace(/\s+/g, "-") // Thay thế khoảng trắng bằng dấu gạch ngang
        .replace(/-+/g, "-"); // Loại bỏ nhiều dấu gạch ngang liên tiếp

    return slug;
};