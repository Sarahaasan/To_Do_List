// quotes 
const quote = document.querySelector(".quote");
const quotes = [
  "Small steps every day lead to big results.",
  "Focus on being productive, not busy.",
  "You don’t need to see the whole staircase, just take the first step.",
  "Success is the sum of small efforts repeated daily.",
  "The secret to getting ahead is getting started.",
  "Done is better than perfect.",
  "Discipline is doing what needs to be done, even if you don't want to.",
  "Progress over perfection.",
  "You are capable of amazing things.",
  "Dream big. Start small. Act now.",
  "It always seems impossible until it’s done.",
  "Stay focused and never give up.",
 
  "Push yourself, because no one else is going to do it for you.",
  "Great things are done by a series of small things brought together."
];

   let randomIndex = Math.floor(Math.random() * quotes.length);
    quote.innerHTML = quotes[randomIndex]

// //----------------------------------------------------------------------------------------------------

let to_doForm = document.querySelector("form");
let tasks_list = document.querySelector('ul');
let input = document.querySelector("input");

let tasks = getTask();   
update_List(tasks)    
let taskID = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;


// on submititng form 
to_doForm.addEventListener('submit',(e)=>
  {
    e.preventDefault();
    AddTask()
  })
  
  // adding task 
  function AddTask()
  {
    let taskcontent = input.value.trim();     
    if(taskcontent =="")
      {
        alert("enter a valid task Data!");
      }
      else 
        {
          const newtask ={
            id:taskID ,
            data:taskcontent,
            completed: false,
          };
          tasks.push(newtask);
          
          taskID++;
          update_List(tasks);
          Savetask();
          input.value=" ";
        }
      }
      // handle changes 
      function update_List(taskARray) {
        tasks_list.innerHTML = "";
        taskARray.forEach((task) => {
          const list_item = createListItem(task);
          tasks_list.appendChild(list_item);
        });
        updateVisibility(tasks) ;

      }
      
      // create a new li 
      function createListItem(task)
      {
        let li_item = document.createElement("li");
        li_item.className = "list-group-item d-flex justify-content-between align-items-center flex-wrap";
        li_item.innerHTML = `
        <span class="me-2 text-break "><strong>${task.id}</strong> - ${task.data}</span>
        <div class="d-flex align-items-center gap-3">
        <input class="form-check-input" type="checkbox" />
        <button class="btn  btn-sm border-0 delete">
        <i class="bi bi-trash text-danger"></i>
        </button> 
        </div>`;
        
        const check = li_item.querySelector("input");
        if (task.completed) {
          li_item.style.textDecoration = "line-through";
          check.checked = true;
        } else {
          li_item.style.textDecoration = "none"; 
          check.checked = false;
        }
        
        // delete task 
        const deleteButton = li_item.querySelector(".delete");
        deleteButton.addEventListener("click",()=>
          {
            tasks = tasks.filter(t => t.id !== task.id);
          Savetask()
          update_List(tasks)
        })
        
        // marked completed 
        
        check.addEventListener("change",()=>
          {
            task.completed = check.checked;
            if (task.completed) {
              li_item.style.textDecoration = "line-through";
            } else {
              li_item.style.textDecoration = "none"; 
            }
            Savetask()
            
          })
          
          return li_item;
        }
        
        // save task 
        function Savetask()
{
  localStorage.setItem("task",JSON.stringify(tasks));
}

// getting tasks from localstorage
function getTask() {
  const data = localStorage.getItem("task");
  return data ? JSON.parse(data) : [];
}

// clear all 
const clear = document.getElementById('clear');
clear.addEventListener("click",()=>
  {
    if (confirm("Are you sure you want to clear All the Tasks!")){
      localStorage.clear();
      tasks=[];
      Savetask()
      update_List(tasks)
    }
  })
  
  // fitering 
  const ALL_btn = document.querySelector(".all") 
  const Active_btn = document.querySelector(".activee") 
const completed_btn = document.querySelector(".completedd") 

ALL_btn.addEventListener('click',()=>
  {
    update_List(tasks)
  })
completed_btn.addEventListener("click", () => {
  const Complet_tasks = tasks.filter(t => t.completed);
  
  if (Complet_tasks.length === 0) {
    tasks_list.innerHTML = "<li class='list-group-item text-center text-muted'>No completed tasks yet.</li>";
    updateVisibility(tasks);  
  } else {
    update_List(Complet_tasks);
  }
});
   Active_btn.addEventListener("click", () => {
  const Active_tasks = tasks.filter(t => !t.completed);

  if (Active_tasks.length === 0) {
    tasks_list.innerHTML = "<li class='list-group-item text-center text-muted'>No active tasks </li>";
    updateVisibility(tasks);
  } else {
    update_List(Active_tasks);
  }
});

      
      // if there is no tasks yet 
function updateVisibility(arr) {
  const notasks_div = document.querySelector(".notask");
  const tasks_sections = document.querySelector(".white");

  if (!arr || arr.length === 0) {
    notasks_div.classList.remove("d-none");
    tasks_sections.classList.add("d-none");
  } else {
    notasks_div.classList.add("d-none");
    tasks_sections.classList.remove("d-none");
  }
}

      
      
      
      