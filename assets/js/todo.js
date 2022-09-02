{
  //to delete the todo card
  let id = $("#item2");
  console.log(id);

  const deleteEle = document.querySelector("#del");
  deleteEle.addEventListener("click", deleteTodos);

  async function deleteTodos() {
    const checkedTodos = document.querySelectorAll("[type='checkbox']");
    checkedTodos.forEach(async (checkedEle) => {
      if (checkedEle.checked) {
        checkedEle.parentElement.parentElement.parentElement.parentElement.remove();
        let id = checkedEle.value;

        const res = await fetch(`/delete-contact/?id=${id}`, {
          method: "delete",
        });
        const data = await res.json();
      }
    });
  }
}
