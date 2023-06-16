export let finalDate = (date) => {
    let dateString = date;

    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString();
    const day = dateObj.getDate().toString();

    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
        day < 10 ? "0" + day : day
    }  `;
    //    remove ' ' start and end
    // console.log(formattedDate.trimStart().trimEnd());

    return formattedDate.trimStart().trimEnd();
};
