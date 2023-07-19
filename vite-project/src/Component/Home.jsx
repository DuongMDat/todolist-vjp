import { useEffect, useRef, useState } from "react";
import { Pagination, Button } from 'antd';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



export default function Home() {
    let nav = useNavigate()
    const params = useParams()
    let [task, setTask] = useState([])
    const [pageInfo, setPageInfo] = useState({
        total: 9,
        pageSize: 6,
        page: 1
    })
    useEffect(() => {
        let config = {
            method: 'get',
            url: `https://backoffice.nodemy.vn/api/tasks?pagination[page]=${pageInfo.page}&pagination[pageSize]=${pageInfo.pageSize}&sort[0]=id:desc`
        }
        axios(config)
            .then(function (res) {
                let list = res?.data?.data
                setTask(list)
                setPageInfo({
                    ...pageInfo,
                    total: res?.data?.meta?.pagination?.total
                })
            })
    }, [pageInfo.page, pageInfo.pageSize])
    let logOut = () => {
        localStorage.removeItem('user')
        nav("/login")
    }

    const [todos, setTodos] = useState([]);
    const todoInputRef = useRef(null);
    let token = JSON.parse(localStorage.getItem('user'))

    const handleAdd = () => {
        const taskText = todoInputRef.current.value;
        if (taskText) {
            // Check if the task already exists in the list
            const existingTodo = todos.find((todo) => todo.title === taskText);
            if (existingTodo) {
                alert('Task already exists');
                return;
            }

            const newTask = {
                title: taskText,
                date: new Date().toISOString(),
                complete: false,
            };
            const config = {
                method: 'post',
                url: 'https://backoffice.nodemy.vn/api/tasks',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.jwt}`,
                },
                data: JSON.stringify({ data: newTask }),
            };

            axios.request(config)
                .then((response) => {
                    const { data } = response;
                    // Thêm công việc mới vào danh sách
                    setTodos([...todos, data]);
                    // Xóa giá trị trong input
                    todoInputRef.current.value = '';
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <div className="homeza">

            <input type="text" ref={todoInputRef} />
            <button onClick={handleAdd}>Thêm task</button>
            {task.map(item => {
                return <h5 key={item.id}>
                    Task {item.id}: {item?.attributes?.title} - ngày tạo: {item?.attributes?.createdAt}
                    <button onClick={() => {
                        nav(`/${item.id}`)
                    }}>Chi tiet</button>

                </h5>
            })}
            <Pagination simple defaultCurrent={1} total={pageInfo.total} page={pageInfo.page} pageSize={pageInfo.pageSize}
                onChange={(trang, size) => {
                    setPageInfo({
                        ...pageInfo,
                        page: trang,
                        pageSize: size
                    })
                }}
            />
            <button onClick={logOut}>
                Đăng xuất
            </button>
            {/* <button onClick={
                nav("/debounce")
            }>
                Debounce demo
            </button> */}
        </div>

    )

}