// js/app.js - UI Control Layer

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. เลือก Elements ---
    const studentList = document.getElementById('student-list');
    const studentForm = document.getElementById('student-form');
    const loading = document.getElementById('loading');
    
    const studentModal = document.getElementById('student-modal');
    const gpaModal = document.getElementById('gpa-modal');
    const statusModal = document.getElementById('status-modal');
    
    const addBtn = document.getElementById('add-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // --- 2. ฟังก์ชันหลักสำหรับโหลดและแสดงข้อมูล ---
    async function refreshDashboard(major = null, status = null) {
        if (!loading) return;
        loading.style.display = 'block';
        studentList.innerHTML = '';
        
        try {
            // เรียกใช้ตัวแปร api ที่ถูกสร้างมาจาก api.js
            const data = await api.getAllStudents(major, status);
            renderStudents(data.students);
            renderStats(data.statistics);
        } catch (error) {
            console.error(error);
            alert('เชื่อมต่อ API ไม่ได้: ' + error.message);
        } finally {
            loading.style.display = 'none';
        }
    }

    // วาด Card นักศึกษาลงหน้าเว็บ
    function renderStudents(students) {
        if (!students || students.length === 0) {
            studentList.innerHTML = '<p class="loading">ไม่พบข้อมูลนักศึกษา</p>';
            return;
        }

        students.forEach(s => {
            const card = document.createElement('div');
            card.className = 'student-card';
            card.innerHTML = `
                <div class="card-header">
                    <span class="status-tag status-${s.status.toLowerCase()}">${s.status}</span>
                    <h3>${s.first_name} ${s.last_name}</h3>
                    <p>รหัส: ${s.student_code}</p>
                </div>
                <div class="card-body">
                    <p><strong>คณะ:</strong> ${s.major}</p>
                    <p><strong>GPA:</strong> ${s.gpa.toFixed(2)}</p>
                </div>
                <div class="form-actions" style="margin-top:15px; border-top:1px solid #eee; padding-top:10px;">
                    <button class="btn btn-secondary" onclick="ui.openStatus(${s.id})">สถานะ</button>
                    <button class="btn btn-secondary" onclick="ui.openGPA(${s.id})">GPA</button>
                    <button class="btn btn-danger" onclick="ui.handleDelete(${s.id})">ลบ</button>
                </div>
            `;
            studentList.appendChild(card);
        });
    }

    // อัปเดตตัวเลขสถิติ
    function renderStats(stats) {
        document.getElementById('stat-active').innerText = stats.active || 0;
        document.getElementById('stat-graduated').innerText = stats.graduated || 0;
        document.getElementById('stat-suspended').innerText = stats.suspended || 0;
        document.getElementById('stat-total').innerText = stats.total || 0;
        document.getElementById('stat-gpa').innerText = (stats.averageGPA || 0).toFixed(2);
    }

    // --- 3. การจัดการเหตุการณ์ (Events) ---

    addBtn.onclick = () => {
        studentForm.reset();
        document.getElementById('modal-title').innerText = 'Add New Student';
        studentModal.style.display = 'block';
    };

    document.querySelectorAll('.close, .btn-secondary').forEach(btn => {
        btn.onclick = () => {
            studentModal.style.display = 'none';
            gpaModal.style.display = 'none';
            statusModal.style.display = 'none';
        };
    });

    studentForm.onsubmit = async (e) => {
        e.preventDefault();
        const studentData = {
            student_code: document.getElementById('student_code').value,
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            email: document.getElementById('email').value,
            major: document.getElementById('major').value
        };

        try {
            await api.createStudent(studentData);
            studentModal.style.display = 'none';
            refreshDashboard();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter === 'all' ? null : btn.dataset.filter;
            refreshDashboard(null, filter);
        };
    });

    // ฟอร์มย่อย (GPA/Status)
    document.getElementById('gpa-form').onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('gpa-student-id').value;
        const gpa = document.getElementById('gpa').value;
        try {
            await api.updateGPA(id, gpa);
            gpaModal.style.display = 'none';
            refreshDashboard();
        } catch (error) { alert(error.message); }
    };

    document.getElementById('status-form').onsubmit = async (e) => {
        e.preventDefault();
        const id = document.getElementById('status-student-id').value;
        const status = document.getElementById('status').value;
        try {
            await api.updateStatus(id, status);
            statusModal.style.display = 'none';
            refreshDashboard();
        } catch (error) { alert(error.message); }
    };

    // --- 4. ฟังก์ชัน Global (เรียกใช้ผ่าน window.ui) ---
    window.ui = {
        async handleDelete(id) {
            if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบนักศึกษานี้?')) {
                try {
                    await api.deleteStudent(id);
                    refreshDashboard();
                } catch (error) {
                    alert(error.message);
                }
            }
        },
        openGPA(id) {
            document.getElementById('gpa-student-id').value = id;
            gpaModal.style.display = 'block';
        },
        openStatus(id) {
            document.getElementById('status-student-id').value = id;
            statusModal.style.display = 'block';
        }
    };

    // เริ่มทำงาน
    refreshDashboard();
});