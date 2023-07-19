import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input, Switch, DatePicker, message } from 'antd';

export default function Detail() {
    let [detail, setDetail] = useState({})
    let nav = useNavigate()
    let token = JSON.parse(localStorage.getItem('user'))
    const [messageApi, contextHolder] = message.useMessage();
    let params = useParams()
    useEffect(() => {
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token.jwt} `,
            }
        };

        axios(config)
            .then(response => {
                setDetail(response?.data?.data)
                let txtData = JSON.stringify(response.data)
                localStorage.getItem("user", txtData)

            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    const updateInput = useRef({})
    useEffect(() => {

        const fetchDetail = async () => {
            try {
                const response = await axios.get(`https://backoffice.nodemy.vn/api/tasks/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token.jwt}`,
                    },
                });
                let  detailData = response?.data?.data;
                setDetail(detailData);
                // updateInput.current.value = `${detailData.title`};
            } catch (error) {
                console.log(error);
            }
        };

        fetchDetail();
    }, [params.id, token.jwt]);

    const handleUpdate = () => {
        const updatedTitle = updateInput.current.value;
        

        const updatedDetail = { ...detail, title: updatedTitle };
        const data = JSON.stringify({ data: updatedDetail });
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
            headers: {
                'Authorization': `Bearer ${token.jwt}`,
                'Content-Type': 'application/json',
                
            },
            data: data,
        };
        axios(config)
            .then((response) => {
                
                alert(`Cập nhật task ${params.id} thành công`)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                
                alert("Không cập nhật được, hết cứu!!!")
            });
    };


    const deleteTask = () => {
        let config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `https://backoffice.nodemy.vn/api/tasks/${params.id}`,
            headers: {
                Authorization: `Bearer ${token.jwt} `,

                'Content-Type': 'application/json',
            }
        };

        axios.request(config)
            .then((response) => {

                let txtData = JSON.stringify(response.data)
                localStorage.getItem('user', txtData)
                window.location.href = '/home'
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <button onClick={() => {
                nav('/home')
            }}>Trang chu</button>


            {detail ? <h1>{detail?.id} - {detail?.attributes?.title}

            </h1> : "Khong co gi o day ca!!!"}
            <input type="text" ref={updateInput} placeholder={detail.title}/>
            <button onClick={handleUpdate}>Update Task</button>
            <button onClick={deleteTask}>Xóa task</button>
        </div>
    )

}
