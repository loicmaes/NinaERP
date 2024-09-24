export interface Version {
  major: number;
  minor: number;
  patch: number;
}

export const version: Version = {
  major: 0,
  minor: 1,
  patch: 0,
};

export function versionFromString(version: string): Version {
  const parts = version.split(".");
  if (parts.length !== 3) throw new VersionParsingError();
  return {
    major: parts[0],
    minor: parts[1],
    patch: parts[2],
  };
}
export function versionToString(_version?: Version): string {
  if (!_version) _version = version;
  return `v${_version.major}.${_version.minor}.${_version.patch}`;
}

/**
 * -1: compare before source
 * 0: compare same as source
 * 1: compare after source
 */
export function compareVersions(source: Version, compare: Version): -1 | 0 | 1 {
  if (compare.major > source.major) return 1;
  if (compare.major < source.major) return -1;

  if (compare.minor > source.minor) return 1;
  if (compare.minor < source.minor) return -1;

  if (compare.patch > source.patch) return 1;
  if (compare.patch < source.patch) return -1;

  return 0;
}

export function isLower(target: Version): boolean {
  return compareVersions(version, target) === -1;
}
export function isExact(target: Version): boolean {
  return compareVersions(version, target) === 0;
}
export function isGreater(target: Version): boolean {
  return compareVersions(version, target) === 1;
}

export class VersionParsingError extends Error {}
