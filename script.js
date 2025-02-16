// 添加新的教育背景条目
function addEducationEntry() {
  const educationFields = document.getElementById('education-fields');

  const newEntry = document.createElement('div');
  newEntry.classList.add('input-entry');

  newEntry.innerHTML = `
    <input type="month" class="form-control" placeholder="起始年月" required>
    <input type="month" class="form-control" placeholder="结束年月" required>
    <input type="text" class="form-control" placeholder="学校" required>
    <input type="text" class="form-control" placeholder="学院" required>
    <input type="text" class="form-control" placeholder="专业" required>

    <button type="button" class="remove-btn" onclick="removeInputEntry(this)">❌</button>
    <!-- 新增补充说明文本框 -->
    <div class="extra-info">
      <textarea class="form-control supplementary-info" rows="2" placeholder="绩点/主修科目等补充说明"></textarea>
    </div>
  `;

  educationFields.appendChild(newEntry);

  // 立即更新简历预览
  updatePreview();
}

// 添加新的校园经历条目
function addExperienceEntry() {
  const educationFields = document.getElementById('experience-fields');

  const newEntry = document.createElement('div');
  newEntry.classList.add('input-entry');

  newEntry.innerHTML = `
    <input type="month" class="form-control" placeholder="起始年月" required>
    <input type="month" class="form-control" placeholder="结束年月" required>
    <input type="text" class="form-control" placeholder="部门/组织" required>
    <input type="text" class="form-control" placeholder="任职" required>

    <button type="button" class="remove-btn" onclick="removeInputEntry(this)">❌</button>
    <div class="extra-info">
      <textarea class="form-control supplementary-info" rows="2" placeholder="校园经历的补充说明"></textarea>
    </div>
  `;

  educationFields.appendChild(newEntry);

  // 立即更新简历预览
  updatePreview();
}

// 添加新的实践经历条目
function addSkillsEntry() {
  const educationFields = document.getElementById('skills-fields');

  const newEntry = document.createElement('div');
  newEntry.classList.add('input-entry');

  newEntry.innerHTML = `
    <input type="month" class="form-control" placeholder="起始年月" required>
    <input type="month" class="form-control" placeholder="结束年月" required>
    <input type="text" class="form-control" placeholder="实践项目" required>

    <button type="button" class="remove-btn" onclick="removeInputEntry(this)">❌</button>
    <div class="extra-info">
      <textarea class="form-control supplementary-info" rows="2" placeholder="实践经历的补充说明"></textarea>
    </div>
  `;

  educationFields.appendChild(newEntry);

  // 立即更新简历预览
  updatePreview();
}

// 移除条目
function removeInputEntry(button) {
  const entry = button.closest('.input-entry');
  entry.remove();
}

// 初始化实时预览
function initRealtimePreview() {
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('input', autoSave);
  });
  updatePreview();
}

document.querySelector('.side-preview').addEventListener('mouseover', function () {
  document.querySelector('.preview-section').style.right = '20px';
});

document.querySelector('.side-preview').addEventListener('mouseout', function (event) {
  // 检查鼠标是否移到了 .preview-section 上
  if (!document.querySelector('.preview-section').contains(event.relatedTarget)) {
    document.querySelector('.preview-section').style.right = '-800px';
  }
});

document.querySelector('.preview-section').addEventListener('mouseleave', function () {
  document.querySelector('.preview-section').style.right = '-800px';
});



// 更新预览内容
function updatePreview() {
  const getValue = id => document.getElementById(id)?.value.trim() || ' ';

  // 获取生日的年月日
  const year = getValue('birthyear');
  const month = getValue('birthmonth');
  const day = getValue('birthday');
  const birthday = (year && month && day) ? `${year}.${month}.${day}` : ' '; // 合并成完整生日

  const photoSrc = document.getElementById('photoPreview').src || ''; // 获取证件照

  const content = `
    <div class="resume-body">
      <div class="resume-header">
        <span class="CN-header">个人简历&nbsp;&nbsp;|</span>
        <span class="EN-header">PERSONAL RESUME</span>
      </div>
      <div class="trapezoid-bar">
        <img src="images/bar.png" alt="" class="bar">
      </div>
      <div class="main-body">
        <div class="resume-section">
          <div class="title-img">
            <img src="images/title1.png" alt="" class="resume-title">
          </div>
          <div class="info-content">
            <div class="left-section">
              <span class="shortspan"><strong>姓名：</strong>${getValue('name')}</span>
              <span class="longspan"><strong>籍贯：</strong>${getValue('hometown')}</span>
              <span class="shortspan"><strong>生日：</strong>${birthday}</span>
              <span class="longspan"><strong>邮箱：</strong>${getValue('email')}</span>
              <span class="shortspan"><strong>电话：</strong>${getValue('phone')}</span>
              <span class="longspan"><strong>微信：</strong>${getValue('wechat')}</span>
            </div>
            <div class="right-section">
              ${photoSrc ? `<img src="${photoSrc}" alt="证件照" class="profile-photo">` : ''}
            </div>
          </div>
        </div>

        <div class="resume-section">
          <div class="title-img">
            <img src="images/title2.png" alt="" class="resume-title">
          </div>
          ${formatEducation()}
        </div>

        <div class="resume-section">
          <div class="title-img">
            <img src="images/title3.png" alt="" class="resume-title">
          </div>
          ${formatExperience()}
        </div>

        <div class="resume-section">
          <div class="title-img">
            <img src="images/title4.png" alt="" class="resume-title">
          </div>
          ${formatSkills()}
        </div>

        <div class="resume-section">
          <div class="title-img">
            <img src="images/title5.png" alt="" class="resume-title">
          </div>
          ${formatCertificate()}
        </div>
      </div>
    </div>
  `;
  document.getElementById('resumeContent').innerHTML = content;
}

function formatEducation() {
  const educationFields = document.querySelectorAll('#education-fields .input-entry');

  return Array.from(educationFields).map(entry => {
    const Start = entry.querySelector('input:nth-child(1)').value.replace("-", ".");
    const End = entry.querySelector('input:nth-child(2)').value.replace("-", ".");
    const school = entry.querySelector('input:nth-child(3)').value;
    const faculty = entry.querySelector('input:nth-child(4)').value;
    const major = entry.querySelector('input:nth-child(5)').value;
    // 获取补充说明文本框中的内容
    const supplementaryText = entry.querySelector('.supplementary-info').value;
    // 将补充说明的内容按行拆分，去除空行
    const supplementaryLines = supplementaryText.split('\n').filter(line => line.trim() !== '');
    // 格式化补充说明内容，每行一个 <li> 元素
    const supplementaryList = supplementaryLines.map(line => `<li>${line.trim()}</li>`).join('');

    return `
      <div class="word-content">
        <div class="content-title">
          <span class="title2-1">${Start}-${End}</span>
          <span class="title2-2">${school}</span>
          <span class="title2-2">${faculty}</span>
          <span class="title2-2">${major}</span>
        </div>
        <ul class="extra-details">
          ${supplementaryList}
        </ul>
      </div>
    `;
  }).join('');
}

function formatExperience() {
  const experienceFields = document.querySelectorAll('#experience-fields .input-entry');

  return Array.from(experienceFields).map(entry => {
    const Start = entry.querySelector('input:nth-child(1)').value.replace("-", ".");
    const End = entry.querySelector('input:nth-child(2)').value.replace("-", ".");
    const organization = entry.querySelector('input:nth-child(3)').value;
    const role = entry.querySelector('input:nth-child(4)').value;
    // 获取补充说明文本框中的内容
    const supplementaryText = entry.querySelector('.supplementary-info').value;
    // 将补充说明的内容按行拆分，去除空行
    const supplementaryLines = supplementaryText.split('\n').filter(line => line.trim() !== '');
    // 格式化补充说明内容，每行一个 <li> 元素
    const supplementaryList = supplementaryLines.map(line => `<li>${line.trim()}</li>`).join('');

    return `
      <div class="word-content">
        <div class="content-title">
          <span class="title2-1">${Start}-${End}</span>
          <span class="title3-2">${organization}</span>
          <span class="title2-2">${role}</span>
        </div>
        <ul class="extra-details">
          ${supplementaryList}
        </ul>
      </div>
    `;
  }).join('');
}

function formatSkills() {
  const skillsFields = document.querySelectorAll('#skills-fields .input-entry');

  return Array.from(skillsFields).map(entry => {
    const Start = entry.querySelector('input:nth-child(1)').value.replace("-", ".");
    const End = entry.querySelector('input:nth-child(2)').value.replace("-", ".");
    const project = entry.querySelector('input:nth-child(3)').value;
    // 获取补充说明文本框中的内容
    const supplementaryText = entry.querySelector('.supplementary-info').value;
    // 将补充说明的内容按行拆分，去除空行
    const supplementaryLines = supplementaryText.split('\n').filter(line => line.trim() !== '');
    // 格式化补充说明内容，每行一个 <li> 元素
    const supplementaryList = supplementaryLines.map(line => `<li>${line.trim()}</li>`).join('');

    return `
      <div class="word-content">
        <div class="content-title">
          <span class="title2-1">${Start}-${End}</span>
          <span class="title4-2">${project}</span>
        </div>
        <ul class="extra-details">
          ${supplementaryList}
        </ul>
      </div>
    `;
  }).join('');
}

function formatCertificate() {
  const certificateFields = document.querySelectorAll('#certificate-fields .input-entry');

  return Array.from(certificateFields).map(entry => {
    // 获取补充说明文本框中的内容
    const supplementaryText = entry.querySelector('.supplementary-info').value;
    // 将补充说明的内容按行拆分，去除空行
    const supplementaryLines = supplementaryText.split('\n').filter(line => line.trim() !== '');
    // 格式化补充说明内容，每行一个 <li> 元素
    const supplementaryList = supplementaryLines.map(line => `<li>${line.trim()}</li>`).join('');

    return `
      <div class="word-content">
        <ul class="extra-details">
          ${supplementaryList}
        </ul>
      </div>
    `;
  }).join('');
}

// 自动保存功能
function autoSave() {
  const formData = {};
  const photoPreview = document.getElementById('photoPreview');

  // 保存常规字段
  document.querySelectorAll('.form-control').forEach(input => {
    if (input.type !== 'file') {
      formData[input.id] = input.value;
    }
  });

  // 保存证件照Base64数据
  if (photoPreview.src) {
    formData.photoData = photoPreview.src;
  }

  localStorage.setItem('resumeData', JSON.stringify(formData));
}

// 加载保存数据
function loadSavedData() {
  const savedData = localStorage.getItem('resumeData');
  if (savedData) {
    const formData = JSON.parse(savedData);

    // 恢复常规字段
    Object.entries(formData).forEach(([id, value]) => {
      const element = document.getElementById(id);
      if (element && element.type !== 'file') {
        element.value = value;
      }
    });

    // 恢复证件照预览
    if (formData.photoData) {
      document.getElementById('photoPreview').src = formData.photoData;
    }
  }
}

// PDF导出功能
function exportPDF() {
  const opt = {
    margin: [10, 0, 10, 0],  // 设置页面边距
    filename: `简历_${document.getElementById('name').value || '未命名'}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 3, useCORS: true, scrollY: 0 },  // 增加 useCORS 以确保图像加载
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      autoPaging: true  // 自动分页
    }
  };

  const element = document.querySelector('.resume-body');
  html2pdf().set(opt).from(element).save();
}


// 清空表单
function clearForm() {
  if (confirm('确定要清空所有内容吗？')) {
    document.querySelectorAll('.form-control').forEach(input => {
      input.value = '';
    });
    localStorage.removeItem('resumeData');
    updatePreview();
  }
}

// 证件照预览
function previewPhoto() {
  const photoInput = document.getElementById('photo');
  const photoPreview = document.getElementById('photoPreview');

  if (photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      photoPreview.src = e.target.result;
    }
    reader.readAsDataURL(photoInput.files[0]);
  }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  initRealtimePreview();
  loadSavedData();
});

// 检测内容是否溢出
function isContentOverflowing(container) {
  return container.scrollWidth > container.clientWidth;
}

// 更新滚动条状态
function updateScrollbar() {
  const contentWrapper = document.querySelector('.content-wrapper');
  const bottomScroll = document.querySelector('.bottom-scroll-container');

  if (isContentOverflowing(contentWrapper)) {
    bottomScroll.style.display = 'block'; // 显示滚动条
  } else {
    bottomScroll.style.display = 'none'; // 隐藏滚动条
  }
}

// 同步滚动
const contentWrapper = document.querySelector('.content-wrapper');
const bottomScroll = document.querySelector('.bottom-scroll-container');

contentWrapper.addEventListener('scroll', () => {
  bottomScroll.scrollLeft = contentWrapper.scrollLeft;
});

bottomScroll.addEventListener('scroll', () => {
  contentWrapper.scrollLeft = bottomScroll.scrollLeft;
});

// 初始化
updateScrollbar();

// 监听窗口大小变化
window.addEventListener('resize', updateScrollbar);

// 监听内容变化
const observer = new MutationObserver(updateScrollbar);
observer.observe(contentWrapper, {
  childList: true,
  subtree: true,
});