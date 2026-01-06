window.onscroll = function() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    document.getElementById("scroll-progress").style.width = (winScroll / height) * 100 + "%";
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.typewriter').forEach(el => observer.observe(el));

function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.classList.add('active');
    }, 10);

    if(id === 'modal-video') {
        const vp = document.getElementById('vid-player');
        if(vp) vp.play();
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    setTimeout(() => {
        modal.style.display = 'none';
        const vp = modal.querySelector('video');
        if(vp) {
            vp.pause();
            vp.currentTime = 0;
        }
    }, 500); 
}