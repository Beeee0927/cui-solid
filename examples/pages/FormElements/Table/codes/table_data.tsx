export default `const [data, setData] = createSignal([
    {
        name: 'John Brown',
        age: 18,
        address: 'New York No. 1 Lake Park',
        job: 'Data engineer',
        interest: 'badminton',
        birthday: '1991-05-14',
        book: 'Steve Jobs',
        movie: 'The Prestige',
        music: 'I Cry',
    },
    {
        name: 'Jim Green',
        age: 25,
        address: 'London No. 1 Lake Park',
        job: 'Data Scientist',
        interest: 'volleyball',
        birthday: '1989-03-18',
        book: 'My Struggle',
        movie: 'Roman Holiday',
        music: 'My Heart Will Go On'
    },
    {
        name: 'Joe Black',
        age: 30,
        address: 'Sydney No. 1 Lake Park',
        job: 'Data Product Manager',
        interest: 'tennis',
        birthday: '1992-01-31',
        book: 'Win',
        movie: 'Jobs',
        music: 'Don’t Cry'
    },
    {
        name: 'Jon Snow',
        age: 26,
        address: 'Ottawa No. 2 Lake Park',
        job: 'Data Analyst',
        interest: 'snooker',
        birthday: '1988-7-25',
        book: 'A Dream in Red Mansions',
        movie: 'A Chinese Ghost Story',
        music: 'actor'
    }
]);

const columns = [
    {
        title: 'Name',
        name: 'name',
        width: '100px',
    },
    {
        title: 'Age',
        name: 'age',
        width: '100px',
    },
    {
        title: 'Address',
        name: 'address',
        width: '300px',
    }
]

const [loading, setLoading] = createSignal(false);

<Space dir="v">
    <Table columns={columns} data={data()} border loading={loading()}/>
    <div>
        <Button type='primary' onClick={() => {
            setLoading(true);
            setTimeout(() => {
                const data: any[] = [];
                for (let i = 0; i < Math.random() * 10; i++) {
                    data.push({
                        name: 'name_' + i,
                        age: Math.round(10 + Math.random() * 50),
                        address: 'address ' + i
                    });
                }
                setData5(data);
                setLoading(false);
            }, 500)
        }}>请求数据</Button>
    </div>
</Space>`
