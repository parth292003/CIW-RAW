/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
  tags: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  details: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
  iconName: string;
  category: 'corporate' | 'traditional';
  details: string[];
}

export interface AchievementItem {
  title: string;
  description: string;
  category: string;
}
