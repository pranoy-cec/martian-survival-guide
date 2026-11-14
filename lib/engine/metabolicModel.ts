import { MissionProfile } from '../types';

/**
 * NASA-STD-3001 Martian EVA Physiological & Energy Expenditure Model
 * Calibrated for Martian gravity (0.376 g) with pressurized Extravehicular Mobility Unit (EMU).
 */

export interface EvaSegmentCost {
  distanceKm: number;
  durationHours: number;
  speedKmH: number;
  oxygenLiters: number;
  metabolicKcal: number;
  roverEnergyKwh: number;
  accumulatedFatigueIndex: number;
}

export function calculateSegmentMetabolicCost(
  distanceKm: number,
  slopeDeg: number,
  roughnessScore: number,
  profile: MissionProfile
): EvaSegmentCost {
  const totalMassKg = profile.astronautWeightKg + profile.spacesuitWeightKg;

  // Mars walking velocity in pressurized space suit (Santaniello et al., 2018)
  // Base velocity ~ 3.6 km/h on flat ground
  const baseSpeedKmH = profile.roverAssisted ? 8.0 : 3.6;

  // Speed reduction factor due to slope and surface roughness
  const slopePenalty = Math.exp(-0.06 * Math.max(0, slopeDeg));
  const roughnessPenalty = Math.max(0.4, 1.0 - 0.5 * roughnessScore);
  const effectiveSpeedKmH = Math.max(0.8, baseSpeedKmH * slopePenalty * roughnessPenalty);

  const durationHours = distanceKm / effectiveSpeedKmH;

  // Oxygen Consumption Rate based on NASA Human Systems Standards
  // Base basal rate: ~20 L/hr. Moderate walking: ~50-65 L/hr. High slope: up to 110 L/hr.
  let oxygenLitersPerHour = profile.roverAssisted ? 35.0 : 55.0;
  if (slopeDeg > 12) {
    oxygenLitersPerHour *= (1.0 + (slopeDeg - 12) * 0.08);
  } else if (slopeDeg > 5) {
    oxygenLitersPerHour *= (1.0 + (slopeDeg - 5) * 0.04);
  }
  // Roughness adds physical exertion
  oxygenLitersPerHour *= (1.0 + roughnessScore * 0.25);

  const totalOxygenLiters = Math.round(oxygenLitersPerHour * durationHours * 10) / 10;

  // Metabolic Energy Expenditure (kcal/hr)
  // Mars 0.38g gravity reduces weight by 62%, but inertia and suit joint stiffness remain high.
  // 1 liter O2 consumption metabolizes approximately 4.82 kcal of nutritional substrate.
  const totalMetabolicKcal = Math.round(totalOxygenLiters * 4.82);

  // Pressurized Rover Battery draw (if rover assisted)
  // Baseline rover auxiliary + traction draw ~ 1.2 kW at flat 8 km/h, climbs up to 3.5 kW on steep sand/rock
  let roverEnergyKwh = 0;
  if (profile.roverAssisted) {
    const powerKw = 1.2 + (slopeDeg / 20) * 1.8 + roughnessScore * 0.8;
    roverEnergyKwh = Math.round(powerKw * durationHours * 100) / 100;
  }

  // Accumulated fatigue index (0 to 100)
  const fatigue = Math.min(100, Math.round((durationHours / profile.maxEvaDurationHours) * 80 + slopeDeg * 1.2));

  return {
    distanceKm,
    durationHours: Math.round(durationHours * 100) / 100,
    speedKmH: Math.round(effectiveSpeedKmH * 10) / 10,
    oxygenLiters: totalOxygenLiters,
    metabolicKcal: totalMetabolicKcal,
    roverEnergyKwh,
    accumulatedFatigueIndex: fatigue
  };
}
