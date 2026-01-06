   const container = document.getElementById('profile-container');
        const imageWrapper = document.getElementById('profile-image-wrapper');
        const neonGlow = document.getElementById('neon-glow');

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 10; 
            const rotateX = -((y - centerY) / centerY) * 10; 

            // Added transition suppression for smoothness during mouse move
            imageWrapper.style.transform = `translateX(-50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Neon moves slightly in opposite direction for depth
            neonGlow.style.transform = `translateX(-50%) rotateX(${-rotateX/2}deg) rotateY(${-rotateY/2}deg)`;
            neonGlow.style.opacity = `${0.5 + Math.abs(rotateX)/20}`;
            
            // Pause the breathing animation while interacting
            neonGlow.style.animation = 'none';
        });

        container.addEventListener('mouseleave', () => {
            imageWrapper.style.transform = `translateX(-50%) rotateX(0deg) rotateY(0deg)`;
            neonGlow.style.transform = `translateX(-50%)`;
            neonGlow.style.opacity = `0.5`;
            
            // Resume breathing animation
            neonGlow.style.animation = 'neon-breath 4s ease-in-out infinite';
        });