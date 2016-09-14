'use strict';

function CreateRepository() {
    this.getMyGroupCompact = () => {
        return studentsMock;
    }
}



let studentsMock = [
    {
        name: 'Анастасия Батанина',
        position: 'староста',
        avatar: 'https://pp.vk.me/c633819/v633819348/25565/tbTnJqL1qjI.jpg',
        userlink: '#batanena',
        messagelink: '#messagebatanena' 
    },
    {
        name: 'Денис Жаров',
        position: 'зам. старосты',
        avatar: 'https://pp.vk.me/c631524/v631524005/3c952/KXF_0jVtxm0.jpg',
        userlink: '#jarov',
        messagelink: '#messagejarov' 
    }
]


module.exports = CreateRepository;