/*
 * Diff Match and Patch
 *
 * Copyright 2010 geheimwerk.de.
 * http://code.google.com/p/google-diff-match-patch/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Author: fraser@google.com (Neil Fraser)
 * ObjC port: jan@geheimwerk.de (Jan Weiß)
 */

#import <Foundation/Foundation.h>

#import <DiffMatchPatch/DiffMatchPatch.h>

int main (int argc, const char * argv[]) {
  NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

  NSString *text1 = [NSString stringWithContentsOfFile:@"Speedtest1.txt"
                        encoding:NSUTF8StringEncoding
                           error:NULL];

  NSString *text2 = [NSString stringWithContentsOfFile:@"Speedtest2.txt"
                        encoding:NSUTF8StringEncoding
                           error:NULL];

  DiffMatchPatch *dmp = [DiffMatchPatch new];
  dmp.Diff_Timeout = 0;

  NSTimeInterval start = [NSDate timeIntervalSinceReferenceDate];
  [dmp diff_mainOfOldString:text1 andNewString:text2];
  NSTimeInterval duration = [NSDate timeIntervalSinceReferenceDate] - start;

  [dmp release];

  NSLog(@"Elapsed time: %.4lf", (double)duration);

  [pool drain];
  return 0;
}
