document.addEventListener('DOMContentLoaded', () => {
    // 1. Handle Login Redirection
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const role = document.getElementById('userRole').value;
            const email = document.getElementById('email').value;
            
            // Simple validation for demo purposes
            if (email) {
                if (role === 'hr') {
                    window.location.href = 'HR-Dashboard.html';
                } else if (role === 'jobseeker') {
                    window.location.href = 'Jobs-Dashboard.html';
                }
            }
        });
    }

    // 2. Handle Signup Redirection
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate account creation and redirect to login
            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'Login.html';
        });
    }

    // 3. Dashboard Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.dash-sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target) && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }

    // 4. Handle Navbar Login Button updates
    // This is handled via direct HTML updates in this task, 
    // but we can ensure all .login-btn point to Login.html
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        if (!btn.getAttribute('href').includes('Login.html')) {
            btn.setAttribute('href', 'Login.html');
        }
    });
});
