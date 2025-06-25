import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      name: 'Lin Zeyu',
      title: 'Personal Resume',
      info: {
        phone: 'Phone',
        email: 'Email',
        gender: 'Gender',
        age: 'Age',
        male: 'Male',
      },
      job_intention: 'Job Intention',
      job: {
        direction: 'Direction',
        location: 'Preferred Location',
        type: 'Job Type',
        direction_value: 'Audit/Consulting',
        location_value: 'Zhuhai/Shenzhen',
        type_value: 'Full-time/Internship',
      },
      self_eval: 'Self Evaluation',
      self_eval_content: 'Responsible, cooperative, honest, and trustworthy. Brave to take the first step, adaptable, and able to make multiple plans and adjust according to the situation.',
      education: 'Education',
      education_list: [
        {
          date: '2025.06-2027.01',
          school: 'University of New South Wales',
          major: 'Data Security & Digital Transformation | Dual Master',
          details: 'UK University Exchange | Macau University Bachelor Direct Master | QS Top 30 Direct Master'
        },
        {
          date: '2021.09-2025.07',
          school: 'Macau University of Science and Technology',
          major: 'Business Administration | Bachelor',
          details: 'Exchange, Internship, GPA 3.05/4'
        },
        {
          date: '2025.06-2027.01',
          school: 'University of Bath',
          major: 'Data Security & Digital Transformation | Dual Master',
          details: 'Bath University (ranked 7th by The Guardian UK) scholarship winner; direct master’s from Macau University of Science and Technology; direct master’s from QS Top 30 university.'
        }
      ],
      experience: 'Internship Experience',
      experience_list: [
        {
          date: '2025.03-2025.07',
          company: 'Zhizhi Accounting Firm',
          position: 'Audit Assistant',
          details: 'Worked as a 7-member audit assistant team, completed a comprehensive audit of a ten-million-level enterprise within one week, and improved working paper preparation efficiency by 50%.'
        },
        {
          date: '2023.01-2023.02',
          company: 'Guotai Junan Securities',
          position: 'Business Department Intern',
          details: 'As a client liaison, assisted the mentor in raising an 8-million-yuan fund within two weeks, with a monthly return rate of 7%, and over 70% of clients expressed willingness to reinvest.'
        },
        {
          date: '2022.06-2022.09',
          company: 'Howard Johnson Hotel',
          position: 'Assistant Manager',
          details: 'Responsible for customer recruitment and event planning.'
        },
        {
          date: '2022.06-2022.09',
          company: 'Feng Whisky Catering Company',
          position: 'Assistant Manager',
          details: 'Received VIP clients, organized event projects, and during tenure increased monthly customer flow from 1,400 to 2,300, average spending per customer up by 50%, and revenue up by 146%.'
        }
      ],
      campus: 'Campus Experience',
      campus_list: [
        {
          date: '2024.06-2024.09',
          event: 'HKUST Entrepreneurship Competition',
          role: 'Team Leader/Project Leader',
          details: '境外赛道共12名，项目名称（创新类实战交互技术）'
        },
        {
          date: '2023.06-2023.09',
          event: 'Macau Youth Entrepreneurship Incubation Center',
          role: 'Project Representative',
          details: 'Project stationed in Macau Youth Incubation Center, main person in charge, long-term member.'
        }
      ],
      skills: 'Skills',
      skills_list: [
        'CET-6',
        'IELTS 6.5',
        'Proficient in AI tools for intelligent information management',
        "International driver's license"
      ]
    }
  },
  zh: {
    translation: {
      name: '林泽宇',
      title: '个人简历',
      info: {
        phone: '电话',
        email: '邮箱',
        gender: '性别',
        age: '年龄',
        male: '男',
      },
      job_intention: '求职意向',
      job: {
        direction: '意向岗位',
        location: '期望地点',
        type: '求职类型',
        direction_value: '审计/咨询',
        location_value: '珠海/深圳',
        type_value: '全职/实习',
      },
      self_eval: '自我评价',
      self_eval_content: '工作任劳任怨，具有良好的合作心态。说话诚恳不夸大，言论不跑火车，不科拉支。勇于踏出第一步的同时张弛有度。会做好多个计划但不死板，会合理根据事情情况调整。',
      education: '教育经历',
      education_list: [
        {
          date: '2025.06-2027.01',
          school: '新南威尔士大学',
          major: '数据安全与数字化转型 | 双硕士',
          details: '曾获英国卫报排名第七的巴斯大学奖学金，澳门科技大学本科直硕士，QS前30大学直硕士'
        },
        {
          date: '2021.09-2025.07',
          school: '澳门科技大学',
          major: '商业分析 | 本科',
          details: '单学期满绩点、实习实践早 毕业 GPA 3.05/4'
        },
        {
          date: '2025.06-2027.01',
          school: 'University of Bath',
          major: 'Data Security & Digital Transformation | Dual Master',
          details: 'Bath University (ranked 7th by The Guardian UK) scholarship winner; direct master’s from Macau University of Science and Technology; direct master’s from QS Top 30 university.'
        }
      ],
      experience: '实习经历',
      experience_list: [
        {
          date: '2025.03-2025.07',
          company: '智勤会计师事务所',
          position: '审计助理',
          details: '曾作为7人组审计助理，在一周内完成千万级企业的全面审计，底稿编制效率提高50%'
        },
        {
          date: '2023.01-2023.02',
          company: '国投证券营业部',
          position: '营业部实习生',
          details: '作为客户联络人，协助导师两周内完成规模八百万基金募集，月回报率7%，超7成客户表示愿意追投。'
        },
        {
          date: '2022.06-2022.09',
          company: '枫威士忌餐饮公司',
          position: '经理助理',
          details: '接待优先客户，负责活动项目安排，任职期间客流量从每月1400人次提高到2300人次，客均消费提高50%，营业额146%'
        },
        {
          date: '2022.06-2022.09',
          company: 'Feng Whisky Catering Company',
          position: 'Assistant Manager',
          details: 'Received VIP clients, organized event projects, and during tenure increased monthly customer flow from 1,400 to 2,300, average spending per customer up by 50%, and revenue up by 146%.'
        }
      ],
      campus: '在校经历',
      campus_list: [
        {
          date: '2024.06-2024.09',
          event: '港科大创业大赛',
          role: '总队长/项目负责人',
          details: '境外赛道共12名，项目名称（创新类实战交互技术）'
        },
        {
          date: '2023.06-2023.09',
          event: '澳门青年创业孵化中心',
          role: '项目代表',
          details: '项目驻澳门青年孵化中心主要负责人，长期成员。'
        }
      ],
      skills: '相关技能',
      skills_list: [
        '英语六级',
        '雅思6.5（口语测试6.5）',
        '熟练掌握智能信息管理类的AI工具',
        "International driver's license"
      ]
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh', // 默认语言
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 